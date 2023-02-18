import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { client } from "./db-connection.js";

const PORT = 4000;
const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.get("/home", async (req, res) => {
  try {
    const response = await client
      .from("users")
      .select("id, nickname")
      .eq("id", req.query.id);

    res.status(response.status).send(response?.data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  try {
    const response = await client
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .eq("password", password);

    if (!response.data.length) res.status(403).send("Takie konto nie istnieje");
    else res.status(response.status).send(response?.data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/register", async (req, res) => {
  const {
    nickname,
    password,
    passwordRecoveryQuestion,
    passwordRecoveryAnswer,
  } = req.body;

  try {
    const checkUsername = await client
      .from("users")
      .select("nickname")
      .eq("nickname", nickname);

    if (checkUsername.status == 200 && checkUsername.data?.length) {
      res.status(409).send("Nazwa użytkownika jest zajęta");
    } else {
      const response = await client.from("users").insert({
        id: uuidv4(),
        nickname,
        password,
        passwordRecoveryQuestion,
        passwordRecoveryAnswer,
      });

      res.sendStatus(response.status);
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/password-recovery", async (req, res) => {
  const {
    nickname,
    passwordRecoveryQuestion,
    passwordRecoveryAnswer,
    newPassword,
  } = req.body;

  try {
    const checkUsername = await client
      .from("users")
      .select("nickname")
      .eq("nickname", nickname);

    if (checkUsername.status == 200 && checkUsername.data?.length) {
      const response = await client
        .from("users")
        .update({ password: newPassword })
        .eq("nickname", nickname)
        .eq("passwordRecoveryQuestion", passwordRecoveryQuestion)
        .eq("passwordRecoveryAnswer", passwordRecoveryAnswer);

      res.sendStatus(response.status);
    } else {
      res.status(403).send("Nazwa użytkownika nie istnieje");
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));

process.on("exit", async function () {
  await connection.close();
});
