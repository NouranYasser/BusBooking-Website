const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized =require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system

// Admin 
router.post("/create",
    async (req, res) => {
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
          ticket_price	: req.body.ticket_price	,
          day: req.body.day,
          time1: req.body.time1,
          max_travelers: req.body.max_travelers
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
    }
  );

  router.put(
    "/:id",admin, // params
   
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF APPOINTMENT EXISTS OR NOT
        const appointment = await query("select * from appointments where id = ?", [
          req.params.id,
        ]);
        if (!appointment[0]) {
          res.status(404).json({ ms: "appointment not found !" });
        }
  
        // 3- PREPARE APPOINTMENT OBJECT
        const appointmentObj = {
          from: req.body.from,
          to: req.body.to,
          ticket_price	: req.body.ticket_price	,
          day: req.body.day,
          time1: req.body.time1,
          max_travelers: req.body.max_travelers
        };
  
        // 4- UPDATE APPOINTMRNT
        await query("update appointments set ? where id = ?", [appointmentObj, appointment[0].id]);
  
        res.status(200).json({
          msg: "appointment updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
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
      const appointment = await query("select * from appointments where id = ?", [
        req.params.id,
      ]);
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
    search = `where from LIKE '%${req.query.search}%' or to LIKE '%${req.query.search}%'`;
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
//  MAKE REQUEST[USER]
router.post(
  "/request",

  body("appointment_id").isNumeric().withMessage("please enter a valid appointment ID"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF APPOINTMENT EXISTS OR NOT
      const appointment = await query("select * from appointments where id = ?", [
        req.body.appointment_id,
      ]);
      if (!appointment[0]) {
        res.status(404).json({ ms: "appointment not found !" });
      }

      // 3 - PREPARE APPOINTMENT REQUEST OBJECT
      const requestObj = {
        user_id: res.locals.user.id,
        appointment_id: appointment[0].id,
      };

      // 4- INSERT APPOINTMENT OBJECT INTO DATABASE
      await query("insert into requests set ?", requestObj);

      res.status(200).json({
        msg: "request added successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
module.exports = router;

