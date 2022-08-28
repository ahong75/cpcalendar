const axios = require('axios')


const getCodeforcesContests = async () => {
    const req = axios.get('http://codeforces.com/api/contest.list?gym=false')
    return req.then(response => response.data)
}

const parseCodeforcesContests = async () => {
    const contestData = await getCodeforcesContests()
    const contestArray = Object.keys(contestData).map(key => contestData[key])
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
    return contests
}

const endpoints = [parseCodeforcesContests]

const aggregate = async () => {
    const contests = endpoints.reduce(async (res, endpoint) => {
        res = res.concat(await endpoint())
        return res;
    }, [])
    return contests
}

module.exports = aggregate