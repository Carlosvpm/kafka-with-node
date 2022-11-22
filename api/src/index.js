import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "161926",
  database: "world",
});
async function connectionBD() {
  try {
    console.log("INICIANDO A CONNEXÃO COM O BANCO DE DADOS...");
    console.time("connection");
    connection.connect();
    console.timeEnd("connection");
    console.log("CONEXÃO BEM SUCEDIDA...");
  } catch (err) {
    console.error("FALHA NA CONEXÃO COM O BANCO DE DADOS");
  }
}
function queries() {
  connection.query("SELECT * FROM city", (erro, results) => {
    console.log(results);
  });
}
function main() {
  connectionBD();
  // queries();
}

main();
