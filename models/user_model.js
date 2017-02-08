var Sequelize = require('sequelize');
var db = require('../utils/db_connect.js');

var User = db.define('user', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: 'default.png'
    },
    password: {
        type: Sequelize.TEXT ,
        allowNull: false
    }
},{
    classMethods:{
        buildFromArgs: function(username, email, password, avatar){
            this.create({
                username: username,
                email: email,
                password: password,
                avatar: avatar || 'default.jpg',
            }).then(function(newUser){
                console.log(" A new user has been added to DB");
                console.log(newUser.get());
            });
        }
    },
    instanceMethods:{
        changePassword:function(newPass){
            this.set(password, newPass)
            .then(function(user){
                console.log(user + "'s  password has been updated");
            })
        }
    }
});

module.exports = User;