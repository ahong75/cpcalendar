const express = require('express')
const app = express()
const cors = require('cors')
const contestRouter = require('./controllers/contests')

app.use(express.json())
app.use(cors())
app.use('/', contestRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})