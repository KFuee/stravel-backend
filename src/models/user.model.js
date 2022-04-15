const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const { roles } = require('../config/roles');

const { toJSON } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error('Dirección de correo electrónico no válida');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: (value) => {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'La contraseña debe contener al menos un número y una letra'
          );
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// plugins
userSchema.plugin(toJSON);

/* eslint-disable func-names */

/**
 * Comprueba si el email está en uso
 * @param {string} email - Email a comprobar
 * @returns {Promise<boolean>} - Devuelve true si el email está en uso
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

/**
 * Comprueba si la contraseña es correcta
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
