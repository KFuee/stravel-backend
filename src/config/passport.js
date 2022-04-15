const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const config = require('.');
const { tokenTypes } = require('./tokens');

const { User } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// eslint-disable-next-line consistent-return
const verifyJwt = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Tipo de token inválido');
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, verifyJwt);

module.exports = jwtStrategy;
