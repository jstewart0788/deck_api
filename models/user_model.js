var Sequelize = require('sequelize');
var db = require('../utils/db_connect.js');
var bcrypt = require('bcryptjs');

var User = db.define('user', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail:{
                msg: "Must enter a valid email"
            }
        }
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: 'default.png'
    },
    password: {
        type: Sequelize.TEXT ,
        allowNull: false,
        set: function(pass){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(pass, salt);
            this.setDataValue('password', hash);
        }
    }
},{
    underscored:true,
    classMethods:{
        buildFromArgs: function(username, email, password, avatar){
            return this.build({
                username: username,
                email: email,
                password: password,
                avatar: avatar || 'default.jpg',
            });
        }
    },
    instanceMethods:{
        changePassword: function(newPass){
            this.set('password', newPass)
            return this.save();
        },
        comparePassword: function(password, cb){
            bcrypt.compare(password, this.get('password'), function(err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        }
    }
});

// User.sync({force:true}).then(function(){
//    var  rick = User.buildFromArgs("rick", "rick@dude.com", "gsdfgsg" );
//    console.log(rick.get());
//     rick.changePassword("newPass")
//     console.log(rick.get());
// }); 

module.exports = User;

