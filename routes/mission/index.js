const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require("../../config/dbPool");
const upload = require('../../module/multer.js');


router.post("/", upload.single('reward'), (req, res) => {
    let connection = mysql.createConnection(dbConfig);

    // request 읽기
    const { parents_id, content, deadline } = req.body;
    const reward = req.file.location;
    console.log("!!!!!!!!!!!!!!!!!!"+req.file.location);

    // const reward = jsonidfy(req.file);
    // parents_id 가지고 parent 찾아서 연결되어 있는 child_id 찾기
    let query1 = `SELECT * FROM parents where id = ?`;

    connection.query(query1, [parents_id], (err, result) => {
        if (err) throw err;
        else {
            let child_id = result[0].child_id;

            // 얻은 child_id 가지고 mission 데이터 만들기
            let mission = {
                id: 0,
                content,
                reward,
                deadline,
                count: 0,
                parents_id,
                child_id
            };

            // mission db에 저장하기
            let query2 = "INSERT INTO mission SET ?";

            connection.query(query2, [mission], (err, result) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        msg: "mission posting fail"
                    });
                    connection.end();
                    console.log("mission post error : " + err);
                } else {
                    console.log(result);

                    res.status(200).send({
                        success: true,
                        msg: "successful mission post",
                    });
                    connection.end();
                    console.log("successful loading movies data");
                }
            });
        }
    });
});

router.get("/", (req, res) => {
    let connection = mysql.createConnection(dbConfig);
    const isParent = req.query.isParent;
    const id = req.query.id;
    const field = isParent ? "parents_id" : "child_id";

    let query = `SELECT * FROM mission where ${field}=${id}`;

    console.log(query);

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: "loading mission failed"
            });
            connection.end();
            console.log("select all query error : " + err);
        } else {
            if (result.length == 0) return res.status(404).send("Not found");
            res.status(200).send({
                success: true,
                msg: "successful loading mission data",
                data: {
                    result
                }
            });
            connection.end();
            console.log("successful loading mission data");
        }
    });
});

router.put("/", (req, res) => {
    let connection = mysql.createConnection(dbConfig);

    // request 읽기
    const { mission_id, content, reward, deadline, count } = req.body;

    // mission_id 가지고 mission 불러오기
    let query1 = `SELECT * FROM mission where id = ?`;

    connection.query(query1, [mission_id], (err, result) => {
        if (err) throw err;
        else {
            let child_id = result[0].child_id;
            let parent_id = result[0].parent_id;
            let mission = result[0];
            console.log(mission);

            // 새로운 mission 데이터 만들기
            let newMission = {
                ...mission,
                reward,
                content,
                deadline,
                count
            };

            // mission db에 저장하기
            let query2 = "UPDATE mission SET ? where id = ?";

            connection.query(query2, [newMission, mission_id], (err, result) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        msg: "mission update fail"
                    });
                    connection.end();
                    console.log("mission put error : " + err);
                } else {
                    console.log(result);

                    res.status(200).send({
                        success: true,
                        msg: "successful mission put",
                        data: {
                            result
                        }
                    });
                    connection.end();
                    console.log("successful update");
                }
            });
        }
    });
});

router.delete("/", (req, res) => {
    let connection = mysql.createConnection(dbConfig);

    const mission_id = req.query.mission_id;

    // mission_id 가지고 mission 지우기
    let query = `DELETE FROM mission where id = ?`;

    connection.query(query, [mission_id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send({
                success: true,
                msg: "successful mission delete",
                data: {
                    result
                }
            });
            connection.end();
            console.log("successful delete");
        }
    });
});

module.exports = router;
