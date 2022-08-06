import { useState } from "react";

const UrlBar = ({ setInputValue }) => {
    const [value, setValue] = useState("");

    const handleClick = () => {
        setInputValue(value);
        setValue("");
    };
    return (
        <div className="input">
            <h1>
                <span>
                    {" "}
                    <span> FROM LONG TO SHORT </span>
                </span>
            </h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter link here"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></input>
                <button onClick={handleClick}>Short</button>
            </div>
        </div>
    );
};

export default UrlBar;
