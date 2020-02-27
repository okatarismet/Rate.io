
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{
    const token = req.get('token')
    if(!token){
        return res.status(400).json({
            message: "Your body has to contain 'token' field!"
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}