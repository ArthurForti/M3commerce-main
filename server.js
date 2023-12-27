const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const port = process.env.PORT || 5000;
const routes = require("./routes.json");
const express = require('express');
app.use(express.static('dist', { 'Content-Type': 'application/javascript' }));



const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter({
  users: 600,
  products: 444,
  menu: 644,
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);
app.use(express.static('src'));
app.use('/dist', express.static('dist'))

console.log("Server is running on port:", port);
