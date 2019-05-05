const mysql = require('mysql');
const express = require('express');
const router = express.Router();
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
});

module.exports = router;