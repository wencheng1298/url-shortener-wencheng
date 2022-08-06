import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

const URLResult = ({ inputValue }) => {
    const [shortenUrl, setShortenUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            var res = await axios({
                method: "post",
                headers: {
                    accept: "application/json",
                },
                url: "http://localhost:9000/shorten",
                data: {
                    longUrl: inputValue,
                },
            });
            console.log(res.data.data.shortened_url);
            setShortenUrl(res.data.data.shortened_url);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (inputValue.length) {
            fetchData();
        }
    }, [inputValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 100);
        return () => clearTimeout(timer);
    }, [copied]);

    if (loading) {
        return <p className="noData">Loading...</p>;
    }

    if (error) {
        return <p className="noData">{error.response.data.msg}</p>;
    }

    return (
        <>
            {shortenUrl && (
                <div className="shorturl">
                    <p>{shortenUrl}</p>
                    <CopyToClipboard
                        text={shortenUrl}
                        onCopy={() => setCopied(true)}
                    >
                        <button className={copied ? "copied" : ""}>
                            Copy URL to clipboard
                        </button>
                    </CopyToClipboard>
                </div>
            )}
        </>
    );
};

export default URLResult;
