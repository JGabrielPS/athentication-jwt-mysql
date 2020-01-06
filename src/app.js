const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}) 

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})