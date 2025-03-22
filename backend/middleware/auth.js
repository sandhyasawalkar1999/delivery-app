import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

  const { token } = req.headers;
  console.log(token, "token in backend request");
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again"
    })
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }

}

export default authMiddleware;