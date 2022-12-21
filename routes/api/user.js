const express = require('express'); 

const router = express.Router();

var dbConn=require('../../config/db');

//ROUTES

//Insert
//@routes POST api/user/add
//@desc INSERT data to the database
//@access PRIVATE 

router.post('/add', (req,res) => {
    var Stu_id = req.body.Stu_ID;
    var Stu_ln = req.body.Stu_LN;
    var Stu_fn = req.body.Stu_FN;
    var Stu_program = req.body.Stu_Program
    var Stu_birthdate = req.body.Stu_Birthdate
    var Stu_TIPemail = req.body.Stu_TIPEMAIL
    var password = req.body.Password

    sqlQuery = `INSERT INTO user_tb(Stu_ID, Stu_LN, Stu_FN, Stu_Program, Stu_Birthdate, Stu_TIPEMAIL, Password)
    VALUES (${Stu_id},"${Stu_ln}","${Stu_fn}","${Stu_program}", "${Stu_birthdate}", "${Stu_TIPemail}", "${password}")`;

    dbConn.query(sqlQuery, function(error,results,fields) {
        console.log("Data is now inserted");
        if(error) throw error;
        res.status(200).json(results);
    });
});

// VIEW
// @routes GET api/user/view
// @desc VIEW Data from the Database
// @access PUBLIC

router.get('/view', (req, res) => {
    sqlQuery = `SELECT * FROM user_tb`;
    dbConn.query(sqlQuery, function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
    });
});

// PATCH
// @routes UPDATE api/user/update
// @desc CHANGES data from the database

router.patch('/update/:id',(req, res) => {
    console.log('API CONNECTION SUCCESS!');
    const id = req.params.id;
    dbConn.query(`SELECT Stu_ID FROM user_tb WHERE Stu_ID = ${id}`, function(error, results, fields){
        if(error) throw error;
        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else {
            var Stu_id = req.body.Stu_ID;
            var Stu_ln = req.body.Stu_LN;
            var Stu_fn = req.body.Stu_FN;
            var Stu_program = req.body.Stu_Program
            var Stu_birthdate = req.body.Stu_Birthdate
            var Stu_TIPemail = req.body.Stu_TIPEMAIL
            var password = req.body.Password
            dbConn.query(`UPDATE user_tb SET Stu_ID = ${Stu_id}, Stu_LN = '${Stu_ln}', Stu_FN = '${Stu_fn}', Stu_Program = '${Stu_program}', 
            Stu_Birthdate = '${Stu_birthdate}', Stu_TIPEMAIL = '${Stu_TIPemail}', Password = '${password}' WHERE Stu_ID = ${id}`, function(error, results, fields){
                console.log("Entry Updated");
                if (error) return;
                res.status(200).json(results);
            });
        }

    });
});

// DELETE
// @routes DELETE api/user/delete
// @desc DELETES data from the database

router.delete('/delete/:Stu_ID', (req,res) => {
    console.log('API Running');
    const Stu_ID = req.params.Stu_ID;
    dbConn.query(`SELECT Stu_ID from user_tb WHERE Stu_ID = ${Stu_ID}`, function(error, results, fields){
        if (error) throw error;
        
        else if (!results.length) {
            console.log("ID does not exist")
            res.status(300).json("ID does not exist");
            return;
        }
        else {
            dbConn.query(`DELETE from user_tb WHERE Stu_ID = ${Stu_ID}`, function(error,results, fields){
                console.log("Data DELETED");
                if (error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;