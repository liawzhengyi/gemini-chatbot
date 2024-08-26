import {useState} from 'react'


const App = () => {
  const [error, setError] = useState("")
  return (
    <div className="app">
      <section className="search-section">
        <p>What do you want to know?
          <button className="surprise">Surprise me</button>
        </p>
          <div className="input-container">
            <input
              value={""}
              placeholder = "what do you want to know?"
              onChange={""}

            />
            {!error && <button>Ask me</button>}
            {error && <button>Clear</button>}
          </div>

          {error && <p>{error}</p>}
          <div className="search-result">
            <div>
              <div key={""}>
                <p className="answer"></p>
              </div>
            </div>
          </div>

      </section>
    </div>
  );
}

export default App;
