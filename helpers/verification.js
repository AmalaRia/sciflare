const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
Router.use(express.json()); // for parsing application/json
Router.use(express.urlencoded({ extended: true }));
const checkToken = (req, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        console.log("req.token: ", req.token);
        next(); // Call next to proceed to the next middleware
    } else {
        // If header is undefined return Forbidden (403)
        res.sendStatus(403); // Send response
    }
}

const userVerify = async (req,res, next) => {
    try {
        await checkToken(req, next); // Pass req, res, and next to checkToken

        console.log("req.token: ", req.token);

        jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
            if (err) {
                // If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403); // Send response
            } else {
                console.log("checkkkkkkkkk");
                next(); // Call next to proceed to the next middleware or route handler
                // If token is successfully verified, we can send the authorized data 
                // res.json({
                //     message: 'Successful log in',
                //     authorizedData
                // });
                console.log('SUCCESS: Connected to protected route');
            }
        });
    } catch (error) {
        console.log(error); // Pass error to Express error handler middleware
    }
}

module.exports = userVerify