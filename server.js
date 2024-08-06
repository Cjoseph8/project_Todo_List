require('./config/dbConfig');
const cors = require('cors');
const morgan = require("morgan");
const express = require('express');
const PORT = process.env.PORT 
const userRouter = require('./routers/userRouter');
const listRouter = require('./routers/listRouter');


const app = express();
app.use(cors({origin: "*"}));

app.use(morgan("dev"))
app.use(express.json());

app.use('/api/v1', userRouter)
app.use('/api/v1', listRouter)


app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
});
