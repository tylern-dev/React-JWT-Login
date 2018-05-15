// require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const salt = 10

exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      // user.find returns empty array if nothing is found
      if (user.length >= 1) {
        console.log('with email', user)
        return res.status(409).json({ message: 'Email already exists' })
      } else {
        bcrypt.hash(req.body.password, salt).then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName
          });
          user.save()
            .then(result => {
              console.log(result);

              const token = jwt.sign({
                id: result._id,
                name: result.firstName,
                email: result.email,
                role: result.role
              }, process.env.JWT_SECRET, {expiresIn: '24h'});

              res.status(201).json({ message: 'User created', ssid: token });
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({ error: err })
            })
        })
      }
    })
}

exports.user_login = (req, res, next) => {
  // var authHeader = req.headers.authorization.split(" ")[1]
  // // jwt.verify(authHeader, process.env.JWT_SECRET)

  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Invalid Username or Password" })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Invalid Username or Password" });
        }
        if (result) {
          jwt.sign(
            { _id: user._id, email: user.email, role:user.role },
            process.env.JWT_SECRET,
            {expiresIn: '24h'},
            (err, token) => {

            return res.status(200).json({
              message: 'Auth Successful',
              ssid: token
            });
          });
        } else {
          res.status(401).json({ message: 'Invalid Username or Password' })
        }
      })


    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.users_get_all = (req, res, next) => {
  User.find()
    .then(result => {
      res.status(200).json(result.map(name => name.email))
    }).catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.update_user = (req, res, next) => {

  //need to check IDs using both _id and id otherwise navigating to /profile breaks app
  const userId = req.userDecode._id || req.userDecode.id
  User.findById(userId, (err, user)=>{
    if(err) throw err;

    user.set({...req.body});
    user.save((err, result) =>{
      if(err) throw err;
      console.log('save',result)
    })
  })
  res.json({message: 'Profile updated'})
}

exports.update_password = (req, res, next) => {
  const userId = req.userDecode._id

  User.findById(userId)
  .exec()
  .then((user)=>{
    //compare the password and write new pw if true
    bcrypt.compare(req.body.currentPassword, user.password)
      .then((result)=>{
        if(result){
          bcrypt.hash(req.body.newPassword, salt)
            .then((hash)=>{
              user.set({password: hash})
              user.save()
                .then((result)=>{
                  res.status(200).json({message: 'Password has been updated'})
                })
                .catch( err =>{
                  res.status(400).json({message: 'Error updating password'})
                })
            })
            .catch(()=>{
              res.status(400).json({message: 'Password write error'})
            });
        } else {
          res.status(401).json({message: 'Username or Password is invalid'})
        }
      })
      .catch(()=>{
        res.status(401).json({message: 'Username or Password is invalid'})
      });
  })
  .catch(()=>{
    res.status(401).json({message: 'Username or Password is invalid'})
  })

}

