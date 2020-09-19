module.exports = (sequelize, Sequelize) => {
    const Leaderboard = sequelize.define("leaderboard", {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      score: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.INTEGER
      },
      instagram_account: {
        type: Sequelize.STRING
      }
    });
    
    return Leaderboard;
  };