const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool
const checkAuth = require('../middleware/check-auth')
const pool = new Pool({
  user: 'SECRET',
  host: '195.201.19.95',
  database: 'SECRET',
  password: 'SECRET',
  port: 5432,
})

/**
 * 
 */
router.delete('/user/:id',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
})

router.delete('/brand/:id',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM brand WHERE id = $1', [id], (error, result) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).send(`Brand deleted with ID: ${id}`)
    })
})

router.delete('/company/:id',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM company WHERE id = $1', [id], (error, result) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({error:error});
      }
      res.status(200).send(`Company deleted with ID: ${id}`)
    })
})
module.exports = router;