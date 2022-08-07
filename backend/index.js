import express from "express";
import jsonwebtoken from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import productRoutes from "./route/productroutes.js";
import dotenv from "dotenv";

const app = express();
const csrfProtection = csurf({
  cookie: true,
});
let refreshTokens = [];

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(csrfProtection);

function getUser(EnteredUserEmail, EnteredUserPassword) {
  let foundUser = JSON.parse(process.env.USERS).find(
    (user) =>
      user.email === EnteredUserEmail && user.password === EnteredUserPassword
  );

  console.log("index.js-> getUser", foundUser);
  return foundUser;
}

app.post("/login", (req, res) => {
  let { email, password } = JSON.parse(req.body.data).user;
  let existingUser;
  try {
    existingUser = getUser(email, password);
  } catch {
    const error = new Error("Error! Something went wrong.");
    console.log("Error in login catch block", err);
    return res.status(401).send({ response: "Error! Something went wrong." });
  }
  if (!existingUser) {
    return res.status(401).send({ response: "Invalid email or password" });
  }
  let token;
  try {
    //Creating jwt token
    token = jsonwebtoken.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );
    const refreshToken = jsonwebtoken.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);
    console.log("Success Login");
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  } catch (err) {
    console.log("Error in creating jsonwebtoken catch block", err);
    return res
      .status(401)
      .send({ error: "Error! Something went wrong.Please try again." });
  }

  return res.status(200).send({
    success: true,
    response: {
      userId: existingUser.id,
      username: existingUser.username,
    },
  });
});

app.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      token,
      { expiresIn: "20m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  });
});

app.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.status(200).send({ response: { message: "Logout successful" } });
});

app.use("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/", productRoutes);
// app.use(function (err, req, res, next) {
//   // do something about the err
//   return res.status(404).send("Please Logins");
// });
app.listen(5000);
console.log("App running on localhost:5000");

// app.use(function (req, res) {
//   //1 year
//   res.setHeader("Cache-Control", "max-age=31536000");
// });
