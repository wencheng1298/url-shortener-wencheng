const express = require("express");
const app = require("./app");
const PORT = 9000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
