import { useState, useEffect } from 'react'
import axios from 'axios'
import ContestEntry from './components/ContestEntry'

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
