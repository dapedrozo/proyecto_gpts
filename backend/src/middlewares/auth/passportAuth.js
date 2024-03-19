import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import User from "../../models/usuarios/User.js";
import crypto from 'crypto';
import TokensWhitelist from '../../models/generals/TokensWhitelist.js'

const secretKey = config.JWTSECRET;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const validToken = await TokensWhitelist.findOne({ jtiToken: payload.jti })
      if (!validToken) {
        done(null, false)
        return
      }
      const currentTime = new Date();
      const difference = currentTime - validToken.lastActivity;
      const fiveteenMin = 15 * 60 * 1000;
      if (difference >= fiveteenMin) {
        await TokensWhitelist.findOneAndDelete({ jtiToken: payload.jti });
        done(null, false);
        return;
      }
      await TokensWhitelist.findOneAndUpdate({ jtiToken: validToken.jtiToken }, { lastActivity: currentTime }, { new: true })
      const userFound = await User.findOne({ _id: payload.id }).select('-password -numeroTelefono').populate({
        path: "empresa",
        select: "_id identificacion tipoEmpresa"
      }).populate({
        path: "roles",
        select: "-_id -empresa",
        populate: {
          path: "permissions",
          select: "-_id name"
        }
      });
      if (userFound) {
        done(null, userFound);
        return
      } else {
        done(null, false);
        return
      }
    } catch (error) {
      done(error, false);
    }
  })
);

export const generateToken = (user) => {
  const currentDate = new Date().toISOString();
  const randomString = crypto.randomBytes(16).toString('hex');
  const jti = crypto.createHash('sha256').update(currentDate + randomString).digest('hex');
  const payload = { id: user._id, email: user.email, nombre: user.nombre, empresa: user.empresa, imagenPerfil: user.imagenPerfil, roles: user.roles, lastActivity: user.lastLogin };
  return jwt.sign(payload, secretKey, { jwtid: jti });
}

export const decodeToken = (token) => {
  const decodedToken = jwt.decode(token);
  const jti = decodedToken.jti;
  if (decodedToken) {
    return jti
  } else {
    return false
  }
}

export const ensureAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      res.status(403).json({ message: "Ya iniciaste sesion" });
    } else {
      next();
    }
  })(req, res, next);
};

export const authenticateJwt = passport.authenticate("jwt", { session: false });

export { passport };
