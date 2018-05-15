const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

// this will verify the token sent from the client and run it agains a user in the db
exports.verifyClientToken = (req,res,next) => {


  const userId = req.userDecode.id || req.userDecode._id

  console.log('userId--->',userId)

    User.findById(userId)
      .then((user) => {
        console.log('USER',user)
        // send the first name back to the client!
        res.status(200).json({message: 'Token OK', firstName: user.firstName});
      })
      .catch(err => {
        res.status(401).json({message: 'User does not exist'});
      })
    }



