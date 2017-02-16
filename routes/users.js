var express = require('express');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../utils/jwt_config');
var router = express.Router();


/* GET users listing. */
router.post('/create', function(req, res) {
  var info = req.body.data;
  var newUser = User.buildFromArgsUser(
    info.username,
    info.email,
    info.password,
    info.avatar);
  newUser.save();
  res.json( {result: 'User Successfully Added'});
});

router.post('/login', function(req, res) {
  var info = req.body.data;

  User.findOne({ where: {username: info.username} })
  .then(function(user) {
      if (!user) {
            console.log('no user found');
            res.json({ error: "Sorry, we don't recognize this username." });
      }

      if (user) {
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch === true) {
                console.log('right password: ' + user);
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                }, jwtConfig.jwtSecret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                res.json({token})
            }
            else {
                console.log('wrong password');
                res.json({
                    error: 'Sorry, the password does not match the username.'
                })
            }
        });
    }
  })  
})

module.exports = router;
