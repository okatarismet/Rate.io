const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool
const checkAuth = require('../middleware/check-auth')
const validator = require('validator');
const pool = new Pool({
  user: 'SECRET',
  host: '195.201.19.95',
  database: 'SECRET',
  password: 'SECRET',
  port: 5432,
})

/**
 * It allows to update an existing element by id
 */
/**
 * author: ismet
 * TO-DO: it is not working yet all other fields has to be added
 */
router.post('/user/:id',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
  const id = parseInt(req.params.id)
  console.log(id)
  const { fname, lname, sex, place, title_id, nickname } = req.body

  pool.query(
    'UPDATE users SET fname = $1, lname = $2, sex = $3, place = $4, nickname = $5 WHERE id = $6 returning *; ',
    [fname, lname, sex, place, nickname, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).json({message:error});
      }
      console.log('user updated')
      pool.query('UPDATE user_title SET title_id = $1 where user_id = $2', [title_id, id],(error, result) => {
        if (error) {
          console.log(error);
         // return res.status(400).json({message:error});
        }
        console.log('title updated')
      //  return res.status(200).send(`Success`);
      })
      return res.status(201).send(`Success`);
    }
  )
  
})

//  The postgres protocol only allows a cursor to be created & executed with a prepared statement. 
//      A prepared statement in postgres can contain at most one statement. 
//      So...it's actually impossible to allow multiple statements to create a cursor at the protocol level. 
//  Sooo v2 will never work!
router.post('/userv2/:id',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
  const id = parseInt(req.params.id)
  console.log(id)
  const { fname, lname, sex, place, title_id, nickname } = req.body

  pool.query(
    'UPDATE users SET fname = $1, lname = $2, sex = $3, place = $4, nickname = $5 WHERE id = $6 returning *;'+
    ' UPDATE user_title SET title_id = $7 where user_id = $6',
    [fname, lname, sex, place, nickname, id, title_id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).json({message:error});
      }
      console.log('user updated')
      return res.status(200).send(`Success`);
    }
  )
  
})

router.get('/user/:id/gizle',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
  const id = parseInt(req.params.id)

  pool.query(
    'UPDATE users SET gizli = true WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({message:error});
      }
      res.status(200).send(`Hided`)
    }
  )
  
})

router.get('/user/:id/gizleme',checkAuth,(req,res,next)=>{
  if(!req.params.id){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
  const id = parseInt(req.params.id)

  pool.query(
    'UPDATE users SET gizli = false WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({message:error});
      }
      res.status(200).send(`Hided`)
    }
  )
  
})



router.post('/brand/:id',checkAuth,(req,res,next)=>{
    if(!req.params.id){
      return res.status(400).json({
        message:"Your params has to contain 'id' fields!"
      });
    }
    const id = parseInt(req.params.id)
    const { name } = req.body
    if(!validator.isAlpha(name)){
      return res.status(400).json({
        mesage: "the string should contain only letters (a-z | A-Z)."
      })
    }
  
    pool.query(
      'UPDATE brand SET name = $1 WHERE id = $2',
      [name, id],
      (error, result) => {
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({message:error});
        }
        res.status(200).send(`Brand modified with ID: ${id}`)
      }
    )
    
})

router.post('/company/:id',checkAuth,(req,res,next)=>{
    if(!req.params.id){
      return res.status(400).json({
        message:"Your params has to contain 'id' fields!"
      });
    }
    const id = parseInt(req.params.id)
    const { name, place } = req.body
    if(!validator.isAlpha(name) || !validator.isAlpha(place) ){
      return res.status(400).json({
        mesage: "the string should contain only letters (a-z | A-Z)."
      })
    }
  
    pool.query(
      'UPDATE company SET name = $1, place = $2 WHERE id = $3',
      [name, place, id],
      (error, result) => {
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({message:error});
        }
        res.status(200).send(`Company modified with ID: ${id}`)
      }
    )
})
  

module.exports = router;