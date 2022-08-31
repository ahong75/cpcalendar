const axios = require('axios')
const fetch = require('cross-fetch')

const parseCodeforcesContests = async () => {
    const getCodeforcesContests = () => {
        const response = axios.get('http://codeforces.com/api/contest.list?gym=false')
        return response.then(response => response.data)
    }
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
    console.log(contests)
    return contests
}

const parseAtCoderContests = async () => {
    const getAtCoderContests = async () => {
        const req = fetch('https://kenkoooo.com/atcoder/resources/contests.json')
        return req.then(response => response.data)
    }
    const contestData = await getAtCoderContests()
    const contestArray = contestData.contests
    const contests = contestArray.reduce((res, contest) => {
        if (contest.start_epoch_second > Date.now() * 1000) {
            res.push({
                name: contest.title,
                link: `https://atcoder.jp/contests/${contest.id}`,
                date: contest.start_epoch_second
            })
        }
        return res;
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