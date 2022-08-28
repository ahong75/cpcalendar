const axios = require('axios')

const getContests = async () => {
    const request = axios.get('http://codeforces.com/api/contest.list?gym=false')
    return request.then(response => response.data)
}

module.exports = getContests