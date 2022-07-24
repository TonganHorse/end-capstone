require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
  const { username, email, password, fullname } = req.body;
  console.log(username, email, password, fullname);
  const validateUser = await sequelize.query(`
    SELECT * FROM users WHERE username = '${username}'
    `);
  //@ts-ignore
  if (validateUser[1].rowCount !== 0) {
    res.status(500).send("Username already Exists");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    console.log(passwordHash);
    await sequelize.query(
      `INSERT INTO users(username, password, email, fullname )  values('${username}','${passwordHash}','${email}','${fullname}')`
    );
  }
  const user = await sequelize.query(
    `SELECT * FROM users WHERE username = '${username}'`
  );
  res.status(200).send(user);
  return;
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await sequelize
    .query(`SELECT * FROM users WHERE username = '${username}'`)
    .catch((err) => console.log(err));
  console.log(user);
  if (user[1].rowCount === 1) {
    if (bcrypt.compareSync(password, user[0][0].password)) {
      let object = {
        id: user[0][0].user_id,
        email: user[0][0].email,
        username,
      };
      res.status(200).send(object);
    } else {
      res.status(401).send("Password is Incorrect");
    }
  } else {
    res.status(401).send("Username is Incorrect");
  }
});
app.get("api/workout", (req, res) => {
  console.log(req.params);
});
app.post("/api/createWorkout", async (req, res) => {
  const workout = await sequelize.query;
});

app.post("/api/postComment", async (req, res) => {
  const { id, compose } = req.body;

  await sequelize.query(
    `insert into comments(comment, user_id) values('${compose}', '${id}')`
  );
  const getAllComments = await sequelize.query(
    `select * from comments join users on comments.user_id = users.user_id`
  );
  res.status(200).send(getAllComments[0]);
});

app.get("/api/getAllWorkouts", async (req, res) => {
  sequelize
    .query(
      `SELECT * FROM workouts INNER JOIN users on workouts.user_id = users.user_id`
    )
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    });
});

app.get("/api/getAllComments", async (req, res) => {
  const getAllComments = await sequelize.query(
    `select * from comments join users on comments.user_id = users.user_id`
  );
  res.status(200).send(getAllComments[0]);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
