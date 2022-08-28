import { useState, useEffect } from 'react'
import axios from 'axios'

// Turn to contest object with needed properties
const ContestEntry = ({ contest }) => {
    const { name, link, date} = contest
    return (
        <li>{name} {link} {date}</li>
    )
}

const App = () => {
    const [contests, setContests] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/')
            .then(response => {
                console.log("Promise fulfilled")
                setContests(response.data)
            })
    }, [])
    
    console.log(contests)
    return (
        <div>
            <ul>
                {contests.map(contest => <ContestEntry contest={contest} key={contest.key}/>)}
            </ul>
        </div>
    )
}

export default App;
