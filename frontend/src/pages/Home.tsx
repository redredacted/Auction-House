import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
}

export default Home
