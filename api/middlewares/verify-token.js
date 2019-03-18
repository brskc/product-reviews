const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;
  console.log(token);

  if (token){
    jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
      if (err){
        res.json({
          status: false,
          msg: 'Failed to authenticate token.' + err
        });
      }else{
        req.decode = decoded;
        next();
      }
    })
  }else{
    res.json({
      status: false,
      msg: 'No token provided'
    });
  }
};
