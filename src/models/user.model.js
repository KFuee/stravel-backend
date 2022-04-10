const mongoose = require('mongoose');
const validator = require('validator');

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
  },
  {
    timestamps: true,
  }
);

// plugins
userSchema.plugin(toJSON);

/**
 * Comprueba si el email está en uso
 * @param {string} email - Email a comprobar
 * @returns {Promise<boolean>} - Devuelve true si el email está en uso
 */
// eslint-disable-next-line func-names
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
