import React from 'react'
import moment from 'moment'

// Turn to contest object with needed properties
const ContestEntry = ({ contest }) => {
    const { name, link, timestamp} = contest
    const date = moment(timestamp).format("DD-MM-YYYY HH:mm:ss")
    return (
        <li>{name} {link} {date}</li>
    )
}

export default ContestEntry