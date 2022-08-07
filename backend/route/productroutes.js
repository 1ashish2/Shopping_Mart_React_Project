import express from "express";
import {
  getProductLists,
  getProductDetail,
} from "../controller/productcontroller.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const router = express.Router();

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (token) {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        // res.redirect("/login");
        next(err);
        //return res.status(404).send("Please Login");
      } else {
        console.log(user);
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).send("Please Login");
  }
};

router.get("/productlist", getProductLists);

// router.get("/productlist/:id", authenticateJWT, getProductDetail);
router.get("/productlist/:id", getProductDetail);

export default router;
