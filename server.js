const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./route/rountes')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(morgan("dev"))
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('น้องบุ๊คกี้')
})

mongoose.set('strictQuery', false)
mongoose.connect(
    process.env.MONGO_DB,
    { useNewUrlParser : true, useUnifiedTopology: false})
    .then(() => console.log('Database Connected!!'))
    .catch(err => console.log("Error here : "+err))

const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`))