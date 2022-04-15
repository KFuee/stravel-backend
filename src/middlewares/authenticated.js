const passport = require('passport');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { rolePermissions } = require('../config/roles');

const verifyCallback =
  // eslint-disable-next-line consistent-return
  (req, resolve, reject, requiredPermissions) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(
          httpStatus.UNAUTHORIZED,
          'Debes autenticarse para acceder a este recurso'
        )
      );
    }

    req.user = user;

    if (requiredPermissions.length > 0) {
      const userPermissions = rolePermissions.get(user.role);
      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        userPermissions.includes(requiredPermission)
      );
      if (!hasPermissions && req.params.userId !== user.id) {
        return reject(
          new ApiError(
            httpStatus.FORBIDDEN,
            'No tienes permisos para realizar esta acción'
          )
        );
      }
    }

    resolve();
  };

const authenticated =
  (...requiredPermissions) =>
  async (req, res, next) =>
    new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredPermissions)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

module.exports = authenticated;
