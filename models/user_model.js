var sequalize = require('../utils/db_connect.js');

var User = sequelize.define('user', {
    id:{
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});