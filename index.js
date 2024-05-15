const express = require('express');
const cors = require('cors');
require('dotenv').config()
const authRoutes = require("./src/routes/auth.route");
const categoryRoutes = require('./src/routes/category.route');
const taskRoutes = require('./src/routes/task.route')
const { errorConverter, errorHandler} = require('./src/middlewares//error')

const app = express();
app.use(cors());
app.disable("x-powered-by");
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req,res) => {
    
    res.send("hola");
});


app.use(authRoutes);
app.use(categoryRoutes)
app.use(taskRoutes);

app.use(errorConverter)
app.use(errorHandler);
app.listen(process.env.PORT || 8080,()=>{console.log('listening on port 8080');});