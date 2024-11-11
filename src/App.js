import React from "react";
import Jeux from "./components/Jeux"; 

function App() {

  const styleTitre = {
    color: "blue",        
    fontSize: "24px",      
    fontWeight: "bold",    
    fontFamily: "Arial, sans-serif" 
  };

  return (
    <div>
     
      
      <Jeux  /> 
    </div>
  );
}

export default App;