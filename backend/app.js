import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

import connection from "./db-connection.js";

const PORT = 4000;
const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  try {
    await connection.connect();
    const qr = await connection.query(
      `SELECT username, password FROM users WHERE username='${nickname}' AND password='${password}'`
    );
    await connection.close();
    if (!qr.rows.length) res.sendStatus(403);
    else res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/register", async (req, res) => {
  const { nickname, password } = req.body;
  try {
    await connection.connect();
    const qr = await connection.query(
      `INSERT INTO users ( username, password ) SELECT '${nickname}', '${password}' WHERE NOT EXISTS ( select 1 from users where username='${nickname}' )`
    );
    await connection.close();
    if (!qr.rowsAffected) res.sendStatus(400);
    else res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));

process.on("exit", async function () {
  await connection.close();
});
