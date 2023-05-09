const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized =require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const fs = require("fs"); // file system
const users = require("../routes/users");

 // Add Request [by User]
  router.post("/create",
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //  INSERT REQUEST INTO DB
        const query = util.promisify(conn.query).bind(conn);
        let appointment =await query("select * from appointments where id=  ? ", req.body.id);
        appointment[0] = {...appointment[0],user_id:req.body.user_id}
        delete appointment[0].id;
        
        await query("Insert into requests set  ? ", appointment[0]);
        
        res.status(200).json({
          msg: "request created successfully !",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  //  UPDATE STATUS  [ACCEPTED OR DECLINED]
  router.put(
    "/accept/:id", // params
    
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF REQUEST EXISTS OR NOT
        const request = await query("select * from requests where id = ?", [
          req.params.id,
        ]);
        if (!request[0]) {
          res.status(404).json({ ms: "request not found !" });
        }
  
        // 3- PREPARE REQUEST OBJECT
        const requestObj = {
          status:"accepted"
        };
  
        // 4- UPDATE APPOINTMRNT
        await query("update requests set ? where id = ?", [requestObj, request[0].id]);
  
        res.status(200).json({
          msg: "request updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
);  

router.put(
  "/decline/:id", // params
  
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF REQUEST EXISTS OR NOT
      const request = await query("select * from requests where id = ?", [
        req.params.id,
      ]);
      if (!request[0]) {
        res.status(404).json({ ms: "request not found !" });
      }

      // 3- PREPARE REQUEST OBJECT
      const requestObj = {
        status:"declined"
      };

      // 4- UPDATE APPOINTMRNT
      await query("update requests set ? where id = ?", [requestObj, request[0].id]);

      res.status(200).json({
        msg: "request declined successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);  

//  delete Request [By Admin]
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM requests WHERE id = ${id}`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.log(`Error deleting request ${id}:`, err);
      res.status(500).json({ error: `Error deleting request ${id}` });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: `request ${id} not found` });
    } else {
      res.status(204).send();
    }
  });
}); 

  // get All Requests  [History]
  router.get("/getRequests",async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const requests = await query("select * from requests" );
    res.status(200).json(requests);
  });

  module.exports = router;