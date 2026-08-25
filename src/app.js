const express = require("express");
const connectDb = require("./config/databse");

const app = express();

const { adminAuth } = require("./utils/authMiddleware");
const UserModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new UserModel(req.body);
  //   console.log(req.body);
  //validate request

  // encrypt password
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  try {
    await user.save();
    // throw new Error("this is error");
    res.send("user created successfully");
  } catch (err) {
    console.log("error is getting handled");
    res.status(400).send("Error saving user to database " + err.message);
  }
});
//Login
app.get("/login", async (req, res) => {
  const getEmailId = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ email: getEmailId });
    console.log("user", user);
    if (user == null) {
      res.status(400).send("User not registered , please signup");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      const token = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);

      if (isPasswordMatch) {
        const data = {
          message: "Login successful",
          accessToken: token,
        };
        res.send(data);
      } else {
        res.status(400).send("User not registered , please signup");
      }
    }
  } catch (err) {
    res.status(400).send("Something whent wrong");
  }
});

//get user by email`~
app.get("/user", async (req, res) => {
  const getEmailId = req.body.email;
  console.log("getEmailId", getEmailId);

  try {
    const user = await UserModel.find({ email: getEmailId });
    if (user.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something whent wrong");
  }
});

//feed api - get all user from datatbase
app.get("/feed", async (req, res) => {
  try {
    const user = await UserModel.find({});
    if (user.length === 0) {
      res.status(400).send("No users found, please add dev tinder users");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something whent wrong");
  }
});

connectDb()
  .then(() => {
    console.log("conection extanlished ");
    app.listen(3000, () => {
      console.log("server is successfully listing on port 3000");
    });
  })
  .catch((err) => {
    console.log("connection established failed ");
  });

// app.get(
//   "/user",
//   (req, res, next) => {
//     const data = {
//       firstName: "vivek",
//       lastName: "kujur",
//     };
//     console.log("handler 1");
//     // res.send(data);
//     next();
//   },
//   (req, res, next) => {
//     const data = {
//       firstName: "vivek",
//       lastName: "kujur",
//     };
//     // res.send("second reqponse handler ");
//     console.log("handler 2");

//     next();
//   },
//   (req, res, next) => {
//     const data = {
//       firstName: "vivek",
//       lastName: "kujur",
//     };
//     console.log("handler 3");

//     res.send("second reqponse handler ");
//     next();
//   }
// );
// app.post(
//   "/user",
//   (req, res) => {
//     const data = {
//       firstName: "vivek",
//       lastName: "kujur",
//     };
//     console.log("save data to database");
//     res.send(JSON.stringify(data) + " send data to database successfully");
//   },
//   (req, res) => {
//     const data = {
//       firstName: "vivek",
//       lastName: "kujur",
//     };
//     console.log("save data to database");
//     res.send("second reqponse handler ");
//   }
// );

// app.use("/hello/new/:name", (req, res) => {
//   console.log(req.params);
//   res.send("hello hello  new hello new  ");
// });

// app.use("/hello", (req, res) => {
//   res.send("hello hello hello ");
// });

// app.use("/test", (req, res) => {
//   res.send("hello from express server ");
// });

// // app.use("/admin", (req, res) => {
// //   console.log("adimin call is getting checked ");
// //   const toeken = "uyiyo";
// //   const isAuth = toeken === "xyz";
// //   if (!isAuth) {
// //     res.status(401).send("unauthorized user");
// //   } else {
// //     console.log("authorization is getting checked ");
// //     next();
// //   }
// // });

// app.use("/admin", adminAuth);

// app.get("/admin/getUsers", (req, res) => {
//   res.send("user data found");
// });
// app.get("/admin/deleteUser", (req, res) => {
//   res.send("user deleted");
// });

// app.get("/handleError", (req, res) => {
//   try {
//     throw new Error("this is error");
//   } catch (err) {
//     res.status(500).send("error is not handled, contact support team");
//   }
// });
// app.get("/checkGlobalError", (req, res) => {
//   throw new Error("this is global error");
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     console.log("error is getting handled");
//     res.status(500).send("internal server error");
//   }
// });
