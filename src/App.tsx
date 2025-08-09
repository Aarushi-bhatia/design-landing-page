import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";

function App() {
  const [cursorScale, setCursorScale] = useState(1);
  const [invertColor, setInvertColor] = useState(false);
  return (
    <>
      <CustomCursor cursorScale={cursorScale}/>
      <Hero  />
    </>
  );
}

export default App;
