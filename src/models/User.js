const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  database: "pokedex",
  username: "root",
  password: "",
  dialect: "mysql"
});
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

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
    type: Sequelize.STRING(20),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING(16),
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  timestamps: false
});

User.beforeCreate((user, options) => {
  return async function hashPsw(user) {
    user.password = await bcrypt.hash(user.password, 8);
  };
});

User.beforeCreate((user,options) => {
  user.token = jwt.sign({id: user.id}, process.env.JWT_KEY)
})

User.sync({ alter: true })
  .then(() => console.log("Users table created successfully"))
  .catch(err => console.log(`Error connecting to DB: ${err}`));

const createUser = async({userName, email, password}) => {
  return await User.create(userName, email, password)
}

const getAllUsers = async() => {
  return await User.findAll()
}

const getUser = async(obj) => {
  return await User.findOne({
    where: obj
  })
} 

module.exports = User;
