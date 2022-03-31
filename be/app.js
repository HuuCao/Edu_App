const express = require("express");
const app = express();
const cors = require("cors");
var HTTPS = require("https");
var fs = require("fs");
const createError = require("http-errors");
const router_education = require("./routers/index");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");


Sentry.init({
  dsn: "https://d7aa2241a49c4a6db162497db1973345@o880922.ingest.sentry.io/5835892",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

app.use(cors());
app.use(express.json()); //đọc json
app.use(express.urlencoded({ extended: true })); // đọc dạng url

app.use("/api", router_education)
app.use((error, req, res, next) => {
  const messages = error.message
    .split(":")
    .map((v) => (Number(v) ? Number(v) : v));
  const httpError = createError(...messages);
  res.status(httpError.statusCode || 500).json(httpError);
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server API Work at Port: "+process.env.PORT );
})

var opsys = process.platform;
if (opsys == "darwin" || opsys == "win32" || opsys == "win64") {
  console.log("Start http on local !");
} else {
  var options = {
    key: fs.readFileSync("/etc/letsencrypt/live/edu.engcouple.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/edu.engcouple.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/edu.engcouple.com/chain.pem"),
  };

  HTTPS.createServer(options, app).listen(4002);
}
