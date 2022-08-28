const express = require('express')
const cors = require('cors')
const moment = require('moment')
const app = express()
const getContests = require('./services/contests.js')

app.use(express.json())
app.use(cors())

app.get('/', async (request, response) => {
    const rawContests = await getContests()
    const contestArray = Object.keys(rawContests).map(key => rawContests[key])
    // Why is contestArray[0] "OK"? I really have no idea
    console.log(contestArray[1][0])
    const contests = contestArray[1].reduce((res, contest) => {
        if (contest.phase === 'BEFORE') {
            res.push({
                name: contest.name,
                link: contest.websiteUrl,
                date: contest.startTimeSeconds
            })
        }
        return res
    }, [])
    // const contests = Object.keys(rawContests).map(key => ({
    //     // name: rawContests[key].name,
    //     // link: rawContests[key].websiteUrl,
    //     // date: rawContests[key].startTimeSeconds
    // }))
    response.status(201).json(contests)
}) 

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})