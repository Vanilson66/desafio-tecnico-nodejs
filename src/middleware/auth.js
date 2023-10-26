const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).send('Acesso negado.');
  
    jwt.verify(token, 'secret', (err) => {
      if (err) return res.status(403).send('Token inválido.');
      
      next();
    });
};

module.exports = { verifyJWT };