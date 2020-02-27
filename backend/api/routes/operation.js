const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth')
const pool = new Pool({
  user: 'SECRET',
  host: '195.201.19.95',
  database: 'SECRET',
  password: 'SECRET',
  port: 5432,
})

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;

}

/**
 * Used for logging in
 * input: {
 *            "name":"example",
 *            "password":"1234"
 *        }
 * returns: token which will be expire in 1 hour
 *  !Token artik headerin icinde gidiyor
 */


router.post('/rate',checkAuth,(req,res,next)=>{
  console.log('rating..');
  const {
      rated_type,
      rated_id,
      rate,
      rater_id
      } = req.body
  if(rated_id == rater_id){
    res.status(402).send("You can't rate yourself");
    return
  }
  let title_id = req.body.title_id;
  if(rated_type == 2 || rated_type == 3){
    title_id = null;
  }
  pool.query(
        'select u.gizli from users u WHERE id = $1',
        [rater_id],
        (error, result3) => {
    if (error) {
      console.log("Postgresql Error : "+error);
      return res.status(403).json({'Error :':'First query cannot be done'});
    }
    else { 
      console.log("Asking is Person Hidden : " + result3.rows[0].gizli);
      hidden = result3.rows[0].gizli;
      console.log(hidden);
      if(rated_type == 1){
        if(title_id == null){
          return res.status(401).json({message:"cannot find title_id"});
        }
      }
      pool.query(`INSERT INTO rates (
            rated_type,
            rated_id,
            rate,
            rater_id,
            hidden,
            title_id
            ) VALUES ($1, $2,$3, $4, $5, $6) returning id`, [
              rated_type,
              rated_id,
              rate,
              rater_id,
              hidden,
              title_id
            ], (error, result) => {
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({message:error});
        }
        else {
          console.log("Rate Added with ID: "+result.rows[0].id)
          res.status(201).json({id:result.rows[0].id})
        }
      })
    }
  })
})

module.exports = router;