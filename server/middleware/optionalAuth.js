import jwt from "jsonwebtoken";

/**
 * Optional auth: sets req.userId if a valid token is present.
 * Never sends 401 — use for routes that need to know auth state (e.g. /is-auth).
 */
const optionalAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    req.userId = null;
    return next();
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = tokenDecode?.id ?? null;
  } catch {
    req.userId = null;
  }
  return next();
};

export default optionalAuth;
