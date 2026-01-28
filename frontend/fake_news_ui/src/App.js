import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const checkNews = async () => {
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(`${data.prediction} (${data.confidence})`);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Fake News Detector</h1>
      <textarea
        rows="6"
        cols="60"
        placeholder="Paste news here"
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={checkNews}>Check</button>
      <h2>{result}</h2>
    </div>
  );
}

export default App;
