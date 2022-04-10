const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('La contraseña debe contener al menos 8 caracteres');
  }

  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'La contraseña debe contener al menos un número y una letra'
    );
  }

  return value;
};

module.exports = {
  password,
};
