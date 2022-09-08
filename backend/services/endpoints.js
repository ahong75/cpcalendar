const axios = require('axios')

const parseCodeforcesContests = async () => {
    const getCodeforcesContests = () => {
        const response = axios.get('http://codeforces.com/api/contest.list?gym=false')
        return response.then(response => response.data)
    }
    const contestData = await getCodeforcesContests()
    const contestArray = contestData.result
    const contests = contestArray.reduce((res, contest) => {
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

const parseAtCoderContests = async () => {
    const getAtCoderContests = () => {
        const response = axios.get('https://kenkoooo.com/atcoder/resources/contests.json', {
            headers: {
                'Accept-Encoding': 'gzip',
            }
        })
                .catch(error => console.log(error.toJSON()))
        return response.then(response => response)
    }
    const contestData = await getAtCoderContests()
    const contestArray = contestData.data
    const contests = contestArray.reduce((res, contest) => {
        // 604800 seconds in a week
        if (contest.start_epoch_second > Date.now() / 1000 - 604800) {
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

const endpoints = [parseAtCoderContests, parseCodeforcesContests]

const aggregate = async () => {
    const contestEndpoints = await Promise.all(endpoints.map(endpoint => endpoint()))
    const contests = contestEndpoints.reduce((res, contestEndpoint) => {
        return res.concat(contestEndpoint)
    }, [])
    return contests
}

module.exports = aggregate