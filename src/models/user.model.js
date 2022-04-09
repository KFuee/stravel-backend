const mongoose = require('mongoose');
const validator = require('validator');

const { toJSON } = require('./plugins/toJSON.plugin');

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
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate: (value) => {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error(
              'La contraseña dee contener al menos un número y una letra'
            );
          }
        },
        private: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);

module.exports = User;
