const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system

// Admin
router.post("/create", async (req, res) => {
  try {
    // 1- VALIDATION REQUEST [manual, express validation]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // 3- PREPARE APPOINTMENT OBJECT
    const appointment = {
      from: req.body.from,
      to: req.body.to,
      ticket_price: req.body.ticket_price,
      day: req.body.day,
      time1: req.body.time1,
      max_travelers: req.body.max_travelers,
    };

    // 4 - INSERT APPOINTMENT INTO DB
    const query = util.promisify(conn.query).bind(conn);
    await query("insert into appointments set ? ", appointment);
    res.status(200).json({
      msg: "appointment created successfully !",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


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


      let updateFields = [];
      let values = [];


      if (req.body.from) {
        updateFields.push("from = ?");
        values.push(req.body.from);
      }
      if (req.body.to) {
        updateFields.push("to = ?");
        values.push(req.body.to);
      }
      if (req.body.ticket_price) {
        updateFields.push("ticket_price = ?");
        values.push(req.body.ticket_price);
      }
      if (req.body.day) {
        updateFields.push("day = ?");
        values.push(req.body.day);
      }
      if (req.body.time1) {
        updateFields.push("time1 = ?");
        values.push(req.body.time1);
      }
      if (req.body.max_travelers) {
        updateFields.push("max_travelers = ?");
        values.push(req.body.max_travelers);
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

      let sql = `UPDATE appointments SET ${updateFields.join(
        ", "
      )} WHERE id = ? `;

      await query(sql, [...values, req.params.id]);

      return res.status(200).json({ msg: "appointment updated successfully" });
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

// DELETE APPOINTMENT [ADMIN]
router.delete(
  "/:id", // params
  async (req, res) => {
    try {
      // 1- CHECK IF MOVIE EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const appointment = await query(
        "select * from appointments where id = ?",
        [req.params.id]
      );
      await query("delete from appointments where id = ?", [appointment[0].id]);
      res.status(200).json({
        msg: "appointment delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// LIST & SEARCH [ADMIN, USER]
router.get("/getAppointments", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where appointments.from LIKE '%${req.query.search}%' or appointments.to LIKE '%${req.query.search}%'`;
  }
  const appointments = await query(`select * from appointments ${search}`);
  res.status(200).json(appointments);
});

// SHOW APPOINTMENTS [ADMIN, USER]
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const appointment = await query("select * from appointments where id = ?", [
    req.params.id,
  ]);
  if (!appointment[0]) {
    res.status(404).json({ ms: "appointment not found !" });
  }
  res.status(200).json(appointment[0]);
});

router.post("/saveSearch", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    // 1- VALIDATION REQUEST [manual, express validation]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // 2- CHECK IF USER EXISTS OR NOT
    const user = await query("select * from users where id = ?", [
      req.body.user_id,
    ]);
    if (!user[0]) {
      res.status(404).json({ ms: "user not found !" });
    }

    // 3 - PREPARE APPOINTMENT REQUEST OBJECT
    const searchObj = {
      user_id: req.body.user_id,
      searchTerm: req.query.search,
    };

    // 4- INSERT SEARCH OBJECT INTO DATABASE
    await query("insert into search set ?", searchObj);
    let search = "";
    if (req.query.search) {
      // QUERY PARAMS
      search = `where appointments.from LIKE '%${req.query.search}%' or appointments.to LIKE '%${req.query.search}%'`;
    }
    const appointments = await query(`select * from appointments ${search}`);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
