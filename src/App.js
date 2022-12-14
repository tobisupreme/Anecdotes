import { useState } from 'react'

const DisplayAnecdotes = ({ title, anecdote }) => {
  return (
    <div>
      <h1> {title} </h1>
      <p>{anecdote}</p>
    </div>
  )
}

const DisplayMostVoted = ({ title, anecdote }) => {
  if (!anecdote) return
  return (
    <div>
      <h1> {title} </h1>
      <p>{anecdote}</p>
    </div>
  )
}

const DisplayVotes = ({ points }) => {
  if (!points) return
  let s = 's'
  if (points === 1) {
    s = ''
  }
  return (
    <div>
      has {points} vote{s}
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ]

  const [selected, setSelected] = useState(0)
  const [history, setHistory] = useState([])
  const [points, setPoints] = useState({})

  const generateRandom = () => {
    const no = anecdotes.length
    const randomId = Math.floor(Math.random() * no)
    setHistory(history.concat(selected))
    setSelected(randomId)
  }

  const savePoint = () => {
    if (!points[selected]) {
      const copy = { ...points }
      copy[selected] = 1
      setPoints(copy)
    } else {
      const copy = { ...points }
      copy[selected] += 1
      setPoints(copy)
    }
  }

  const getMostVotedAnecdote = () => {
    let home = Object.keys(points)
    let max = points[home[0]]
    for (let i = 1; i < home.length; i++) {
      if (points[home[i]] > max) {
        max = points[home[i]]
      }
    }
    for (let key in points) {
      if (points[key] === max) {
        return key
      }
    }
  }

  return (
    <div>
      <DisplayAnecdotes title="Anecdote of the day" anecdote={anecdotes[selected]} />
      <DisplayVotes points={points[selected]} />
      <div>
        <Button onClick={savePoint} text="vote" />
        <Button onClick={generateRandom} text="next anecdote" />
      </div>
      <DisplayMostVoted title="Anecdote with most votes" anecdote={anecdotes[getMostVotedAnecdote()]} />
    </div>
  )
}

export default App
