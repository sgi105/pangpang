const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const dbConfig = require("../../config/dbPool");
const upload = require('../../module/multer.js');

router.get('/', (req, res) => {
    let connection = mysql.createConnection(dbConfig);
    let { parents_id } = req.query;
    console.log(parents_id + "!!!!!!!!!!!")
    let selectAllQuery = "select * from message where parents_id = ?";
    connection.query(selectAllQuery, [parents_id], (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: "loading message data fail"
            });
            connection.end();
        } else {
            res.status(200).send({
                success: true,
                msg: "successful loading  message data",
                data: result,
            });
            connection.end();
        }
    });
});

/* 
child_id: INT
  mission_id: INT
  content: STRING
  image: STRING
  mtime: DATE

  */
router.post('/', upload.single('image'), (req, res) => {
    let connection = mysql.createConnection(dbConfig);
    let { child_id, mission_id, content, mtime } = req.body;
    // console.log(req.body.content)
    let selectParentsId = 'SELECT parents_id FROM child WHERE id= ?'
    let InsertMsg = 'INSERT INTO message(id,content,image,mtime,unread,parents_id,child_id,mission_id) VALUES(?,?,?,?,?,?,?,?)'


    connection.query(selectParentsId, [child_id], (err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: "NULL Parents ID"
            });
            connection.end();
        } else {
            var image = req.file ? req.file.location : null;
            console.log('image:' + image);
            connection.query(InsertMsg, [0, content, image, mtime, 0, data[0].parents_id, Number(child_id), Number(mission_id)], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        msg: "ERROR : insert message"
                    });
                    connection.end();
                } else {
                    console.log(result.insertId);
                    res.status(200).send({
                        success: true,
                        msg: "successful insert  message data",
                        data:{
                            message_id: result.insertId
                        }
                    });
                    connection.end();
                }

            })
        }
    });

})

router.delete('/', (req, res) => {
    let connection = mysql.createConnection(dbConfig);

    let { message_id } = req.query;
    let deleteMsgQuery = "DELETE FROM message WHERE id = ?";
    connection.query(deleteMsgQuery, [message_id], (err, result) => {
        if (err) {
            res.status(500).send({
                stat: "fail",
                msg: "deleting message data fail"
            });
            connection.end();
        } else {
            res.status(200).send({
                success: "success",
                msg: "successful loading  message data",
            });
            connection.end();
        }
    });

})


router.put('/', (req, res) => {
    let connection = mysql.createConnection(dbConfig);

    let { message_id } = req.query;
    console.log(message_id);
    let updateMsgQuery = "UPDATE message SET unread  = ? WHERE id = ?";
    connection.query(updateMsgQuery, [1, message_id], (err, result) => {
        if (err) {
            res.status(500).send({
                stat: "fail",
                msg: "updating message data fail"
            });
            connection.end();
        } else {
            res.status(200).send({
                success: "success",
                msg: "successful updating message data",
            });
            connection.end();
        }
    });

})


router.put('/mission', (req, res) => {
    let connection = mysql.createConnection(dbConfig);

    let { mission_id } = req.query;
    // console.log(mission_id);
    let Query = "select count from mission where id= ?";
    let updateMsgQuery = "UPDATE mission SET count  = count+1 WHERE id = ?";
    connection.query(Query, [mission_id], (err, data) => {
        if (err) {
            res.status(500).send({
                stat: "fail",
                msg: "select err"
            });
            connection.end();
        } else {
            let mission_count = data[0].count;
            connection.query(updateMsgQuery, [mission_id], (err, result) => {
                if (err) {
                    res.status(500).send({
                        stat: "fail",
                        msg: "updating message data fail"
                    });
                    connection.end();
                } else {
                    console.log(")))"+JSON.stringify(result).count);
                    res.status(200).send({
                        success: "success",
                        msg: "successful updating message data",
                        data: {
                           count : data[0].count+1
                        }
                    })
                    connection.end();
                }
            })
        }
    })
})

module.exports = router;
