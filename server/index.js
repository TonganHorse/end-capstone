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
  const validateUser = await sequelize.query(`
    SELECT * FROM users WHERE username = '${username}'
    `);
  //@ts-ignore
  if (validateUser[1].rowCount !== 0) {
    res.status(500).send("Username already Exists");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
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
app.get("/api/getWorkoutComments/:id", async (req, res) => {
  const comments = await sequelize.query(
    `select c.comment, c.comment_id, c.user_id, u.username, u.fullname from comments as c join users as u on u.user_id = c.user_id where c.workout_id = ${+req
      .params.id}`
  );
  res.status(200).send(comments[0]);
});
app.post("/api/postCommentAtId", async (req, res) => {
  const { commentAtId, userId, workoutId } = req.body;
  await sequelize.query(
    `INSERT INTO comments(comment, user_id, workout_id) VALUES('${commentAtId}', ${+userId}, ${+workoutId})`
  );
  res.status(200).send("comment added");
});

app.post("/api/createWorkout", async (req, res) => {
  const { workoutName, intensity, workoutDescription, id } = req.body;
  await sequelize.query(
    `INSERT INTO workouts(name, intensity, user_id, description) VALUES('${workoutName}', '${intensity}', ${+id}, '${workoutDescription}')`
  );
  res.status(200).send("workout added");
});

app.post("/api/postComment", async (req, res) => {
  const { id, compose } = req.body;

  await sequelize.query(
    `insert into comments(comment, user_id) values('${compose}', '${id}')`
  );

  res.status(200).send("comment added");
});

app.get("/api/getAllWorkouts", async (req, res) => {
  sequelize
    .query(
      `SELECT w.workout_id, w.name, w.intensity, u.user_id, description, u.username FROM workouts AS w INNER JOIN users AS u on w.user_id = u.user_id
      `
    )
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    });
});

app.get("/api/getAllComments", async (req, res) => {
  const getAllComments = await sequelize.query(
    `    SELECT u.user_id,c.workout_id, c.comment_id, u.username, c.comment FROM comments AS c JOIN users AS u ON c.user_id = u.user_id where c.workout_id IS NULL
`
  );
  res.status(200).send(getAllComments[0]);
});

app.post("/api/saveWorkout", (req, res) => {
  sequelize.query(
    `INSERT INTO savedworkouts (workout_id, user_id) VALUES (${req.body[0].workout_id}, ${req.body[0].user_id})`
  );
  return res.status(200).send("saved");
});

app.get("/api/getSaved", async (req, res) => {
  const saved = await sequelize.query(
    `SELECT w.workout_id, u.username, w.name, w.intensity, w.description FROM savedworkouts 
    JOIN users as u ON savedworkouts.user_id = u.user_id
    JOIN workouts as w ON savedworkouts.workout_id = w.workout_id`
  );
  res.status(200).send(saved[0]);
});

app.delete("/api/deleteSaved/:id", async (req, res) => {
  await sequelize.query(
    `DELETE FROM savedworkouts WHERE savedworkouts.workout_id = ${req.params.id}`
  );
  res.status(200).send("workout has been deleted");
});

app.post(`/api/postReply`, async (req, res) => {
  const { replyInput, userId, commentId } = req.body;
  await sequelize.query(
    `INSERT INTO replies(reply, user_id, comment_id) VALUES('${replyInput}', ${+userId}, ${+commentId})`
  );
  res.status(200).send("replied");
});

app.get("/api/getReplies/:id", async (req, res) => {
  const replies = await sequelize.query(
    `select u.username, r.reply, u.fullname from replies as r join users as u on u.user_id = r.user_id where r.comment_id = ${+req
      .params.id}`
  );
  res.status(200).send(replies[0]);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
