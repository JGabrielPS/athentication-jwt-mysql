const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  database: "pokedex",
  username: "root",
  password: "",
  dialect: "mysql"
});
const bcrypt = require("bcryptjs");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established succesfully");
  })
  .catch(err => {
    console.error("Unable to connect to DB:", err);
  });

const User = sequelize.define(
  "users",
  {
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
    }
  },
  {
    timestamps: false
  }
);

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 8)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      console.error("Error:", err);
    });
});

User.sync({ alter: true })
  .then(() => console.log("Users table created successfully"))
  .catch(err => console.log(`Error connecting to DB: ${err}`));

const createUser = async (userName, email, password) => {
  return await User.create({
    username: userName,
    email: email,
    password: password
  });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj
  });
};

module.exports = {
  User,
  createUser,
  getAllUsers,
  getUser
};
