var jwt = require("jsonwebtoken");
const JWT_SECRET = "puppy45";

const fetchuser = (req,res,next)=>{
//fetch user from jwt token and 
const token = req.header('auth-token')
if(!token){
    res.status(401).send({error :'Invalid token'})
}

try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
} catch (error) {
    res.status(401).send({error :'Invalid token'})
}
}


module.exports = fetchuser;