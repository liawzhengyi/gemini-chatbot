import { useState } from 'react'


const App = () => {
  const [error, setError] = useState("")
  const [value, setValue] = useState("")
  const [chatHistory, setChatHistory] = useState([])

  const surpriseOption = [
    'who are the founders of Google?',
    'Where does beer come from?',
    'How do you make a cookie?'
  ]

  const surprise = () => {
    const randomValue = surpriseOption[Math.floor(Math.random() * surpriseOption.length)]
    setValue(randomValue)
  }

  const getResponse = async () => {
    if (!value) {
      setError("Please ask a question :)")
      return
    }
    try {
      const option = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:3000/gemini', option)
      const data = await response.text()
      console.log(data)
      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: value
      },
      {
        role: "model",
        parts: data
      }
      ])
      setValue("")

    } catch (error) {
      console.error(error)
      setError("Something went wrong :(. Try again later!")
    }
  }

  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }
  return (
    <div className="search-section">
      <p>What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="what do you want to know?"
          onChange={(e) => setValue(e.target.value)}

        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>

      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, _index) => <div key={_index}>
          <p className="answer">{chatItem.role} : {chatItem.parts}</p>
        </div>)}
      </div>

    </div>
  );
}

export default App;
