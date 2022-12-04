import { Connection } from "postgresql-client";

const connection = new Connection({
  host: "db",
  port: 5432,
  user: "docker",
  password: "123456",
  database: "docker",
});

export default connection;
