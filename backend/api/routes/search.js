const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool
const validator = require('validator');
const pool = new Pool({
  user: 'SECRET',
  host: '195.201.19.95',
  database: 'SECRET',
  password: 'SECRET',
  port: 5432,
})

const handleApostrophe = (search)=>  {
  var parts = search.split("'");
  var a = 1;
  search = parts[0];
  while(a<parts.length){
    search += "''" + parts[a++];
  }
  return search;
}

/**
 * Use it to search any type
 * example : .../search/ismet
 */
router.get('/:search',(req,res,next)=>{
    if(!req.params.search){
      return res.status(400).json({
        message:"Your body has to contain 'search' fields!"
      });
    }
    const search = handleApostrophe(req.params.search.trim());
    pool.query("select 'user' as type, u.id, concat(fname,' ',lname) as name, u.place, t.desc title, t.id title_id "+
            "from users u "+
            "left join user_title ut on u.id = ut.user_id "+
            "left join title t on ut.title_id = t.id "+
            "WHERE lower(fname) like lower('%"+search+"%') or lower(lname) like lower('%"+search+"%') "+
            "union "+
            "select 'brand' as type, b.id, b.name, '','',null "+
            "from brand b "+
            "WHERE lower(name) like lower('%"+search+"%') "+
            "union "+
            "select 'company' as type, c.id, c.name, c.place,'',null "+
            "from company c "+
            "WHERE lower(name) like lower('%"+search+"%') "+
            "ORDER BY type DESC", (error, results) => {
        if (error) { 
          console.log("Postgresql Error : "+error);
          return res.status(400).json({error:error});
        }
        res.status(200).json(results.rows)
      });
})

/**
 * Use it to search USER
 * example : .../search/user/ismet
 */
router.get('/user/:search',(req,res,next)=>{
    if(!req.params.search){
      return res.status(400).json({
        message:"Your body has to contain 'search' fields!"
      });
    }
    const search = req.params.search;
    pool.query('select u.id, u.fname, u.lname, u.place, t.desc title, t.id, title_id '+
            'from users u '+
            'left join user_title ut on u.id = ut.user_id '+
            'left join title t on ut.title_id = t.id '+
            "WHERE lower(fname) like lower('%"+search+"%')", (error, results) => {
  
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({error:error});
        }
        res.status(200).json(results.rows)
      });
})



/**
 * Use it to search BRAND
 * example : .../search/brand/ismet
 */
router.get('/brand/:search',(req,res,next)=>{
    if(!req.params.search){
      return res.status(400).json({
        message:"Your body has to contain 'search' fields!"
      });
    }
    const search = req.params.search;
    pool.query('select b.id, b.name from brand b WHERE lower(name) like  lower(\'%'+search+'%\')', (error, results) => {
  
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({error:error});
        }
        res.status(200).json(results.rows)
      });
})


/**
 * Use it to search COMPANY
 * example : .../search/company/ismet
 */
router.get('/company/:search',(req,res,next)=>{
    if(!req.params.search){
      return res.status(400).json({
        message:"Your body has to contain 'search' fields!"
      });
    }
    const search = req.params.search;
    pool.query('select c.id, c.name, c.place from company c WHERE lower(name) like lower(\'%'+search+'%\')', (error, results) => {
  
        if (error) {
          console.log("Postgresql Error : "+error);
          return res.status(400).json({error:error});
        }
        res.status(200).json(results.rows)
      });
})

module.exports = router;