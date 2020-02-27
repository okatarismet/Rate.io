const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'SECRET',
  host: '195.201.19.95',
  database: 'SECRET',
  password: 'SECRET',
  port: 5432,
})

/**
 * Used for get all elements in database
 * input: none
 * returns: all elements in a json body
 */
router.get('/user',(req,res,next)=>{
    pool.query('SELECT * FROM users ORDER BY id ASC ', (error, results) => {
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({error:error});
        }
        res.status(200).json(results.rows)
      });
})
router.get('/brand',(req,res,next)=>{
  pool.query('SELECT * FROM brand ORDER BY id ASC', (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).json(results.rows)
    });
})
router.get('/company',(req,res,next)=>{
  pool.query('SELECT * FROM company ORDER BY id ASC ', (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).json(results.rows)
    });
})
router.get('/rates',(req,res,next)=>{
  pool.query('SELECT * FROM rates ORDER BY id desc ', (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).json(results.rows)
    });
})
router.get('/title',(req,res,next)=>{
  pool.query('SELECT * FROM title ORDER BY id ASC ', (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).json(results.rows)
    });
})

router.get('/user_title',(req,res,next)=>{
  pool.query('SELECT * FROM user_title ORDER BY user_id deSC ', (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).json(results.rows)
    });
})

module.exports = router;