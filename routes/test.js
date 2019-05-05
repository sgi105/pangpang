const mysql = require("mysql");
const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const dbConfig = require('../config/dbPool')
const resMsg = require('../module/responseMessage')
//테이블에 저장된 모든 영화정보를 조회
router.get('/', (req, res)=> {
	let connection = mysql.createConnection(dbConfig); //
	let selectAllQuery = 'select * from parents';
	connection.query(selectAllQuery, (err, result) => {
		if(err){
			res.status(500).send({
				stat : "fail",
				msg : resMsg.NULL_VALUE
			});
			connection.end();
			console.log("select all query error : "+ err);
		}
		else{
			res.status(200).send({
				stat : "success",
				data : result,
				msg : "successful loading movies data"
			});
			connection.end();
			console.log(resMsg.NULL_VALUE);
		}
	});
=======
const dbConfig = require("../config/dbPool");

//테이블에 저장된 모든 영화정보를 조회
router.get("/", (req, res) => {
  let connection = mysql.createConnection(dbConfig); //
  let selectAllQuery = "select * from parents";
  connection.query(selectAllQuery, (err, result) => {
    if (err) {
      res.status(500).send({
        stat: "fail",
        msg: "loading movies data fail"
      });
      connection.end();
      console.log("select all query error : " + err);
    } else {
      res.status(200).send({
        stat: "success",
        data: result[0].id,
        msg: "successful loading movies data"
      });
      connection.end();
      console.log("successful loading movies data");
    }
  });
>>>>>>> bdad7cacfcc271b53dd816a4f43fc163373b617d
});

module.exports = router;
