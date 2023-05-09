const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized =require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system

// Admin 
router.post("",
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // 3- PREPARE DESTINATION OBJECT
        const destination = {
          des_name: req.body.des_name,
        };
  
        // 4 - INSERT DESTINATION INTO DB
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into destinations set ? ", destination);
        res.status(200).json({
          msg: "destination created successfully !",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

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
  
        // 2- CHECK IF DESTINATION EXISTS OR NOT
        const destination = await query("select * from destinations where id = ?", [
          req.params.id,
        ]);
        if (!destination[0]) {
          res.status(404).json({ ms: "destination not found !" });
        }
  
        // 3- PREPARE DESTINATION OBJECT
        const destinationObj = {
          des_name: req.body.des_name
        };
  
        // 4- UPDATE DESTINATION
        await query("update destinations set ? where id = ?", [destinationObj, destination[0].id]);
  
        res.status(200).json({
          msg: "destination updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
// DELETE DESTINATION [ADMIN]

// Delete a destination by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM destinations WHERE id = ${id}`;
  
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(`Error deleting destination ${id}:`, err);
        res.status(500).json({ error: `Error deleting destination ${id}` });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: `Destination ${id} not found` });
      } else {
        res.status(204).send();
      }
    });
  }); 

// LIST  [ADMIN, USER]
router.get("/getDestinations",async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const destinations = await query("select * from destinations ");
  res.status(200).json(destinations);
});

// SHOW  SPECIFIC DESTINATIONS [ADMIN, USER]
/*router.get("/:id",authorized ,async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const destination = await query("select * from destinations where id = ?", [
    req.params.id,
  ]);
  if (!destination[0]) {
    res.status(404).json({ ms: "destination not found !" });
  }
  res.status(200).json(destination[0]);
});
*/
//   SHOW TRIPS
router.get("/:des_name",authorized ,async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const destinations = await query("SELECT * FROM appointments JOIN destinations ON appointments.id = destinations.id WHERE appointments.to=destinations.des_name & des_name=?",
  [
    req.params.des_name,
  ]);
  res.status(200).json(destinations);
});

module.exports = router;
