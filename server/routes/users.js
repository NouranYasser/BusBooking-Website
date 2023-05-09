const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system
// CREATE USER [ADMIN]
router.post("/create", async (req, res) => {
  try {
    // 1- VALIDATION REQUEST [manual, express validation]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2- PREPARE USER OBJECT
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      phone: req.body.phone,
      status: req.body.status,
      token: crypto.randomBytes(16).toString("hex"), // JSON WEB TOKEN,package CRYPTO -> RANDOM ENCRYPTION STANDARD
    };

    // 3 - INSERT USER INTO DB
    const query = util.promisify(conn.query).bind(conn);
    await query("insert into users set ? ", user);
    res.status(200).json({
      msg: "user created successfully !",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE USER [ADMIN]
router.put(
  "/:id", // params
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF USER EXISTS OR NOT
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      let updateFields = [];
      let values = [];
      if (req.body.email) {
        const checkEmailExists = await query(
          "select * from user where email = ?",
          [req.body.email]
        );
        if (checkEmailExists.length > 0) {
          return res.status(400).json({
            errors: [
              {
                msg: "email already exists !",
              },
            ],
          });
        }

        updateFields.push("email = ?");
        values.push(req.body.email);
      }
      if (req.body.password) {
        updateFields.push("password = ?");
        values.push(await bcrypt.hash(req.body.password, 10));
      }
      if (req.body.phone) {
        updateFields.push("phone = ?");
        values.push(req.body.phone);
      }
      if (req.body.status) {
        if (req.body.status === "active" || req.body.status === "in-active") {
          if (user[0].status === req.body.status) {
            return res.status(400).json({
              errors: [
                {
                  msg: "Its already activated/deactivated ",
                },
              ],
            });
          }

          updateFields.push("status = ?");
          values.push(req.body.status);
        }
      }
      if (updateFields.length === 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "no fields to update !",
            },
          ],
        });
      }

      let sql = `UPDATE users SET ${updateFields.join(
        ", "
      )} WHERE id = ? `;

      await query(sql, [...values, req.params.id]);

      return res.status(200).json({ msg: "user updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        errors: [
          {
            msg: err,
          },
        ],
      });
    }
  }
);

// DELETE USER [ADMIN]
router.delete(
  "/:id", // params

  async (req, res) => {
    try {
      // 1- CHECK IF USER EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      // 2- DELETE USER
      await query("delete from users where id = ?", [user[0].id]);

      res.status(200).json({
        msg: "user deleted successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// LIST & SEARCH [ADMIN]
router.get("/getUsers", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%'`;
  }
  const users = await query(`select * from users ${search}`);
  res.status(200).json(users);
});

// SHOW SPECIFIC USERS [ADMIN]
router.get("/:id", admin, async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const user = await query("select * from users where id = ?", [req.params.id]);
  if (!user[0]) {
    res.status(404).json({ ms: "user not found !" });
  }
  res.status(200).json(user[0]);
});

module.exports = router;
