import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.secret);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    if(error.message === 'jwt expired') {
      res.status(401).json({ message: 'Your login is expired. Please login again' });
    } else if(error.message === 'invalid token') {
      res.status(401).json({ message: 'Please login' });
    }
  }
};

export default auth;