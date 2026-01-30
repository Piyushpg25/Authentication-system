import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again " });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }

    next();
   

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth;
