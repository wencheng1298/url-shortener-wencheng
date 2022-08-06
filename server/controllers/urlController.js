const Sql = require("../db");
const shortid = require("shortid");
const catchError = require("../utils/catchError");
const URL = require("url").URL;

var baseUrl = "localhost:9000/";

isValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};
exports.isValidUrl = isValidUrl;

exports.createUrl = catchError(async (req, res, next) => {
    var url = req.body.longUrl;
    var isValid = isValidUrl(url);
    if (!isValid) {
        return res.status(401).json({
            status: "fail",
            msg: "invalid url or url should start with http/https",
        });
    }
    const db = new Sql();
    await db.initialise();
    // Return shortened URL if already in DB
    result = await db.queryOne("original_url", url);
    if (result) {
        res.status(200).json({
            status: "success",
            data: {
                shortened_url: baseUrl + result.shorten_url,
            },
        });
    } else {
        // Create short url
        const urlCode = shortid.generate();
        db.insert(url, urlCode);
        res.status(200).json({
            status: "success",
            data: {
                shortened_url: baseUrl + urlCode,
            },
        });
    }
});

exports.getUrl = catchError(async (req, res, next) => {
    const urlCode = req.params.shortUrl;
    console.log(urlCode);
    const db = new Sql();
    await db.initialise();

    const urlResult = await db.queryOne("shorten_url", urlCode);
    console.log(urlResult);
    if (urlResult) {
        return res.redirect(urlResult.original_url);
    } else {
        res.status(404).json({
            status: "fail",
            msg: "UrlCode not found",
        });
    }
});
