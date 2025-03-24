const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  console.log(id);
  const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(jwtToken);
  
  return jwtToken
};

module.exports = generateToken;