import db from "./database";
import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

db(app)
  .then(async () => {
    console.log("Database connection established");
    const port = process.env.PORT;
    app.listen(port, () => console.log("App listening on port %s", port));
  })
  .catch((err) => console.log(err));

export default app;
