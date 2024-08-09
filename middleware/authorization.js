const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


// To authenticate if a user is signed in

const authenticate = async (req, res, next) => {
    try {
        const hasAuthorization = req.headers.authorization;

        if (!hasAuthorization) {
            return res.status(401).json({
                message: 'Action requires sign-in. Please log in to continue.'
            });
        }

        const token = hasAuthorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Action requires sign-in. Please log in to continue.'
            });
        }

        const decodedToken = jwt.verify(token, process.env.jwtSecret);
 
        const user = await userModel.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Authentication Failed: User not found'
            });
        }

        req.user = decodedToken;

        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message:  "Please sign in."
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
};

//Check for an Admin
const isAdmin = async (req, res, next) => {
    try {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "Unauthorized: Not an admin" });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const makeAdminUpdate = async(req, res)=>{
    try{
      const {email} =req.body
const findUser=await userModel.findOne({email})
if(!findUser){
 return res.status(404).json({ message: " user not found"})
}
      const admin = await userModel.findOneAndUpdate({email},{isAdmin:true},{new:true,runvalidators:true})
    return  res.status(200).json({ message: "you are now an admin" });
      
    }catch(error){
      res.status(500).json({
        message:error.message
      })
    }
  }
  
  module.exports = {
    authenticate,
    isAdmin,
    makeAdminUpdate
  };