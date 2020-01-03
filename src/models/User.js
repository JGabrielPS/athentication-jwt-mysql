const Sequelize = require("sequelize")
const sequelize = new Sequelize({
  database: "pokedex",
  username: "root",
  password: "",
  dialect: "mysql"
});
const validator = require("validator")
const bcrypt = require('bcryptjs')

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established succesfully");
  })
  .catch(err => {
    console.error("Unable to connect to DB:", err);
  });

const User = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail(value) {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.beforeCreate((user, options) => {
  return async function hashPsw(user) {
    user.password = await bcrypt.hash(user.password, 8)
  }
})

User.sync()
  .then(() => console.log('Users table created successfully'))
  .catch(err => console.log(`Error connecting to DB: ${err}`));

module.exports = User