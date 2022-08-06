const sql3 = require("sqlite3");

class Client {
    constructor() {
        this.db = new sql3.Database(
            "./db/url_mapping.db",
            sql3.OPEN_READWRITE,
            (err) => {
                if (err) return console.error(err.message);
                console.log("SQL successfully connected!");
            }
        );
    }

    async initialise() {
        await this.createURLTable();
    }

    async createURLTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS url(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_url,
            shorten_url)
        `;
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async insert(originalUrl, shortenUrl) {
        const sql = `INSERT INTO url (original_url, shorten_url) VALUES (?, ?)`;
        this.db.run(sql, [originalUrl, shortenUrl], (err) => {
            if (err) return console.error(err.message);
        });
    }

    async queryAll() {
        const sql = `SELECT * FROM url`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    async queryOne(attribute, val) {
        var query = `SELECT * FROM url WHERE ${attribute} = "${val}"`;
        console.log(query);
        return new Promise((resolve, reject) => {
            this.db.get(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

class Sql {
    constructor() {
        if (!Sql.instance) {
            Sql.instance = new Client();
        }
        return Sql.instance;
    }
}

module.exports = Sql;
