module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      instagram_account: {
        type: Sequelize.STRING
      }
    });
    
    return User;
  };