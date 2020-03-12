const config = require("config");
const jwt = require("jsonwebtoken");

//this function sends along the jwt token sent from whether react app or from the rest api call from the tool like postman.
//it accepts request and response and next(calls another middleware may be)
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) return res.status(401).json({ msg: "No token, authorizattion denied" });

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Add user from payload

    req.user = decoded;
    next();
  } catch (error) {
      res.status(400).json({msg:'Token is not valid'});
  }
}
module.exports = auth;
