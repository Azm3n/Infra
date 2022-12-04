import express, { json, urlencoded } from "express";
import morgan from "morgan";

import connection from "./db-connection.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("Hello World!"));

// app.get("/users", async (req, res) => {
//   const users = await select().from("users");
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   const user = await db("users").insert({ name: req.body.name }).returning("*");
//   res.json(user);
// });

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));

process.on("exit", async function () {
  await connection.close();
});
