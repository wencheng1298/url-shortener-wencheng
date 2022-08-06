import UrlBar from "./components/UrlBar";
import "./App.css";
import BackgroundAnimate from "./components/BackgroundAnimate";
import URLResult from "./components/URLResult";
import { useState } from "react";

function App() {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="container">
            <UrlBar setInputValue={setInputValue} />
            <BackgroundAnimate />
            <URLResult inputValue={inputValue} />
        </div>
    );
}

export default App;
