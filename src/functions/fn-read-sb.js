const { app } = require("@azure/functions");
const axios = require("axios");

app.http("fn-read-sb", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const requestData = await request.json();
    const order = requestData.order;
    axios
      .post("http://localhost:7071/api/fn-save-sql", {
        order,
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });

    return { status: 200, body: "Success" };
  },
});
