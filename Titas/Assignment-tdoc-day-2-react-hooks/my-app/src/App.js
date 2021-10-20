import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const[count,setCount]=useState(0);
  useEffect(()=>{
    console.log(count);
  }, [count])
  return (
    <div className="App">
      <button onClick={()=>setCount(count+1)}>click me</button>
    </div>
  );
}

export default App;
