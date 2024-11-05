const { app } = require("@azure/functions");
const mysql = require("mysql2");

var config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "azure-dio",
  port: 3306,
};

app.http("fn-save-sql", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {

    const requestData = await request.json();
    const conn = new mysql.createConnection(config);
    const order = requestData.order;

    conn.query(
      "INSERT INTO orders (name) VALUES (?);",
      [order],
      function (err, results, fields) {
        if (err) throw err;
        else console.log("Inserted " + results.affectedRows + " row(s).");
      }
    );

    return { status: 201, body: order };
  },
});


