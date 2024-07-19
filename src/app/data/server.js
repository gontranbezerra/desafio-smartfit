const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const data = require("./locations.json");

server.use(middlewares);

// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

server.use((req, res, next) => {
  setTimeout(next, 500);
});

server.get("/locations", (req, res) => {
  const { opened } = req.query;
  if (opened) {
    res.jsonp(data.locations.filter((loc) => loc.opened === true));
  } else {
    res.jsonp(data.locations);
  }
});

server.listen(3000, () => {
  console.log("JSON Server is running");
});
