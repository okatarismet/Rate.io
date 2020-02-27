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
 * Get an element details with ID
 */

/**
* Used for search specific USER element by params
* aslinda tam olarak params almiyor
* example;
*   input: /get/users/8
*   returns: the element with id = 8
*/

router.get('/userProfile/:userId',(req,res,next)=>{
  if(!req.params.userId){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
    const id = parseInt(req.params.userId)
    pool.query('select u.id, u.fname, u.lname, u.sex, u.place, t.desc title, t.id title_id, u.gizli, u.nickname, round(cast(avg(r.rate) as numeric), 1) rate '+
              'from users u left join user_title ut on u.id = ut.user_id left join title t on ut.title_id = t.id '+
              'left join rates r on u.id=r.rated_id '+
              'WHERE u.id=$1 and r.rated_type=1 group by u.id, u.fname, u.lname, u.place, t.desc, t.id'
              , [id], (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({message:error});
      }
      res.status(200).json(results.rows)
    });
})


router.get('/user/:userId/:titleId',(req,res,next)=>{
  if(!req.params.userId){
    return res.status(400).json({
      message:"Your params has to contain 'id' fields!"
    });
  }
    const id = parseInt(req.params.userId)
    const title_id = parseInt(req.params.titleId);
    pool.query('select u.id, u.fname, u.lname, u.sex, u.place, t.desc title, t.id title_id, round(cast(avg(r.rate) as numeric), 1) rate '+
              'from users u left join user_title ut on u.id = ut.user_id left join title t on ut.title_id = t.id '+
              'left join rates r on u.id=r.rated_id '+
              'WHERE u.id=$1 and r.rated_type=1 and t.id = $2 group by u.id, u.fname, u.lname, u.place, t.desc, t.id'
              , [id, title_id], (error, results) => {
      if (error) {
        console.log("Postgresql Error : "+error);
        return res.status(400).json({message:error});
      }
      res.status(200).json(results.rows)
    });
})

/**
* Used for search specific BRAND element by params
* aslinda tam olarak params almiyor
* example;
*   input: /get/brand/8
*   returns: the element with id = 8
*/
router.get('/brand/:brandId',(req,res,next)=>{
 if(!req.params.brandId){
   return res.status(400).json({
     message:"Your params has to contain 'id' fields!"
   });
 }
   const id = parseInt(req.params.brandId)
   pool.query('select b.id, b.name, round(cast(avg(r.rate) as numeric),1) rate '+
              'from brand b left join rates r on b.id=r.rated_id '+
              'WHERE b.id=$1 and r.rated_type=2 group by b.id, b.name '
              , [id], (error, results) => {
    if (error) {
      console.log("Postgresql Error : "+error);
      return res.status(400).json({message:error});
    }
    res.status(200).json(results.rows)
   });
})

/**
* Used for search specific COMPANY element by params
* aslinda tam olarak params almiyor
* example;
*   input: /get/company/8
*   returns: the element with id = 8
*/
router.get('/company/:companyId',(req,res,next)=>{
 if(!req.params.companyId){
   return res.status(400).json({
     message:"Your params has to contain 'id' fields!"
   });
 }
 const id = parseInt(req.params.companyId)
  pool.query('select c.id, c.name, c.place, round(cast(avg(r.rate) as numeric),1) rate '+
              'from company c left join rates r on c.id=r.rated_id '+
              'where c.id=$1  and r.rated_type=3 group by c.id, c.name, c.place '
              , [id], (error, results) => {
    if (error) {
      console.log("Postgresql Error : "+error);
        return res.status(400).json({message:error});
    }
    res.status(200).json(results.rows)
  });
})

/* 
 *  Use it to search USER
 */
router.get('/ratings/:ratedType/:ratedId/:titleId',(req,res,next)=>{
  if(!req.params.ratedId){
    return res.status(400).json({
      message:"Your params has to contain 'ratedId' fields!"
    });
  }
  const rated_id = parseInt(req.params.ratedId);
  if(req.params.ratedType != "user"){
    return res.status(400).json({error:"rated_type must be User"});
  }
  const title_id = parseInt(req.params.titleId);
  pool.query('select u.android_id, '+ 
              'case when r.hidden then u.nickname else concat(u.fname,\' \', u.lname) end as name, '+
              'TO_CHAR(r.created :: DATE, \'dd/mm/yyyy\') tarih, r.rate, r.title_id from rates r '+
              'left join users u on u.id=r.rater_id '+
              'where rated_id=$1 and rated_type=1 and title_id=$2 '+
              'order by r.id desc', [rated_id, title_id],(error, results)=>{
    if(error) {
      console.log("Postgresql Error : "+error);
      return res.status(400).json({message:error});
    }
    res.status(200).json(results.rows)
  })
})

/* 
 *  Use it to search BRAND or COMPANY
 */
router.get('/ratings/:ratedType/:ratedId',(req,res,next)=>{
  if(!req.params.ratedId){
    return res.status(400).json({
      message:"Your params has to contain 'ratedId' fields!"
    });
  }
  const rated_id = parseInt(req.params.ratedId);
  const rated_type = req.params.ratedType;
  pool.query('select u.android_id, '+ 
              'case when r.hidden then u.nickname else concat(u.fname,\' \', u.lname) end as name, '+
              'TO_CHAR(r.created :: DATE, \'dd/mm/yyyy\') tarih, r.rate, r.title_id from rates r '+
              'left join users u on u.id=r.rater_id '+
              'where rated_id=$1 and rated_type=$2 '+
              'order by r.id desc', [rated_id, rated_type],(error, result)=>{
    if(error) {
      console.log("Postgresql Error : "+error);
      return res.status(400).json({message:error});
    }
    res.status(200).json(result.rows);
  })
})

router.get('/ratingsOfProfile/:ratedId',(req,res,next)=>{
  if(!req.params.ratedId){
    return res.status(400).json({
      message:"Your params has to contain 'ratedId' fields!"
    });
  }
  const rated_id = parseInt(req.params.ratedId);
  console.log();
  pool.query('select u.android_id, '+ 
              'case when r.hidden then u.nickname else concat(u.fname,\' \', u.lname) end as name, '+
              'TO_CHAR(r.created :: DATE, \'dd/mm/yyyy\') tarih, r.rate, r.title_id  from rates r '+
              'left join users u on u.id=r.rater_id '+
              'where rated_id=$1 and rated_type=1 '+
              'order by r.id desc', [rated_id],(error, results)=>{
    if(error) {
      console.log("Postgresql Error : "+error);
      return res.status(400).json({message:error});
    }
    res.status(200).json(results.rows)
  })
})

router.get('/ratesOLD/:raterId',(req,res,next)=>{
  if(!req.params.raterId){
    return res.status(400).json({
      message:"Your params has to contain 'raterId' fields!"
    });
  }
  const rater_id = parseInt(req.params.raterId)
  pool.query('select u.android_id, '+
            'case when u.gizli then u.nickname else concat(u.fname,\' \', u.lname) end as name, '+
            'TO_CHAR(r.created :: DATE, \'dd/mm/yyyy\') tarih, r.rate  from rates r '+
            'left join users u on u.id=r.rated_id '+
            'where rater_id=$1 '+
            'order by r.id desc', [rater_id],(error, results)=>{
    if(error) {
      console.log("Postgresql Error : "+error);
      return res.status(400).json({message:error});
    }
    res.status(200).json(results.rows)
  })
})

router.get('/rates/:raterId',(req,res,next)=>{
  if(!req.params.raterId){
    return res.status(400).json({
      message:"Your params has to contain 'raterId' fields!"
    });
  }
  const rater_id = parseInt(req.params.raterId)
  pool.query("select 'user' as type, concat(fname,' ',lname) as name, u.android_id, r.created tarih, r.rate, r.title_id, t.desc title from rates r "+
            "left join users u on u.id=r.rated_id "+
            "left join title t on t.id=r.title_id "+
            "where rated_type=1 and rater_id=$1 "+
            "union "+
            "select 'brand' as type, b.name, null, r.created tarih, r.rate, r.title_id, t.desc title from rates r "+
            "left join brand b on b.id=r.rated_id "+
            "left join title t on t.id=r.title_id "+
            "where rated_type=2 and rater_id=$1 "+
            "union "+
            "select 'company' as type, c.name, null, r.created tarih, r.rate, r.title_id, t.desc title from rates r "+
            "left join company c on c.id=r.rated_id "+
            "left join title t on t.id=r.title_id "+
            "where rated_type=3 and rater_id=$1 "+
            "order by tarih desc", [rater_id],(error, results)=>{
    if(error) {
      console.log("Postgresql Error : "+error);
      return res.status(400).json({message:error});
    }
    res.status(200).json(results.rows)
  })
})


module.exports = router;