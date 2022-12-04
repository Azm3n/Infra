import connection from "../db-connection.js";

(async () => {
  try {
    await connection.connect();
    const qr = await connection.query(
      "INSERT INTO users ( username, password ) VALUES ('jan', 'duda'), ('gówniara', 'zrakietka'), ('robert', 'drugipolak')"
    );
    // "INSERT INTO users ( username, password ) SELECT 'jantek', 'jopek' WHERE NOT EXISTS ( select 1 from users where username='jantek' )";
    console.log("added users for tests");
    connection.close();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
