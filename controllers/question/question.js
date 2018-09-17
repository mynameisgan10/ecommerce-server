const db = require('../../models/dbconnection');

const question = {
    create: (req, res) => {
        const question = {
            user_id: 1,
            question: "hello",
            item_id: 4
        }
        db.query("INSERT INTO Questions SET ?", question, (error, results) => {
            if (error) 
                throw error;
            res.json({status: "success", message: "question posted", results: results})
        })
    },
    answer: (req, res) => {
        const answer = ["test answer", 5];
        db.query(
            "UPDATE Questions SET answer = ? WHERE id = ?",
            answer,
            (error, results) => {
                if (error) 
                    throw error;
                res.json({status: "success", message: "answered a question", results: results})
            }
        )

    },
    delete: (req, res) => {
        const id = 5
        db.query("DELETE FROM Questions WHERE id = ?", [id], (error, results) => {
            if (error) 
                throw error;
            res.json({status: "success", message: "comment deleted", results: results})
        })

    }
}

module.exports = question;