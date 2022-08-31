import React from 'react'
import moment from 'moment'

// Turn to contest object with needed properties
const ContestEntry = ({ contest }) => {
    const date = moment(contest.date * 1000).format("DD-MM-YYYY HH:mm:ss")
    return (
        <li>{contest.name} {contest.link} {date}</li>
    )
}

export default ContestEntry