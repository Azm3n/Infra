import connection from "../db-connection.js";

(async () => {
  try {
    await connection.connect();
    const qr = await connection.query(
      "create table users ( userId SERIAL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL )"
    );
    console.log("created table");
    await connection.close();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
