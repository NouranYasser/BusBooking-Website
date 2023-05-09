const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized =require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system

router.get("", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
      // QUERY PARAMS
      search = `where appointments.to LIKE '%${req.query.search}%'`;
    }
    const appointments = await query(`select * from appointments ${search}`);
    res.status(200).json(appointments);
  });

  router.get(
    "/history/:user_id",
    async (req, res) => {
      try {
        const query = util.promisify(conn.query).bind(conn);
        // 2- CHECK IF USER EXISTS OR NOT
        const user = await query("select * from users where id = ?", [
          req.params.user_id,
        ]);
        if (!user[0]) {
          res.status(404).json({ ms: "user not found !" });
        }
  
        // 4- INSERT APPOINTMENT OBJECT INTO DATABASE
        const request =await query("select *  from search Where user_id= ?", req.params.user_id);
  
        res.status(200).json(request);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

//  Your Trips
router.get(
  "/myTrips/:user_id",
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      // 2- CHECK IF USER EXISTS OR NOT
      const user = await query("select * from users where id = ?", [
        req.params.user_id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      // 4- INSERT APPOINTMENT OBJECT INTO DATABASE
      const request =await query("select *  from requests Where user_id= ?", req.params.user_id);

      res.status(200).json(request);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
