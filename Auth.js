const jwt = require('jsonwebtoken');
var key = "!Ng4ckpfpF*M82eqzH#98?uK55&qav5^"
function verifyJWT(token)
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, key, (err, decodedToken) =>
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

function createJWT(data){
  var token = jwt.sign({
     data: data
   }, key, {
      expiresIn: 30,
      algorithm: 'HS256'
  });
  return token;
}

module.exports = {
  verifyJWT,
  createJWT
}
