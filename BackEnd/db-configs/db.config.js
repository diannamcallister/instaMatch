module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password", // TODO: change to your mysql password
    DB: "insta_match",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };