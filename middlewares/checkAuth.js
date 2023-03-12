// const jwt = require('jsonwebtoken')


// const checkAuth = (req, res, next) => {
//     const token = req.cookies.jwt

//     // check if json web token exists & is verified
//     if (token) {
//         jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
//             if (err) {
//                 console.log(err)
//                 res.header('token', token)
//             } else {
//                 console.log(decodedToken)
//                 next();
//             }
//         })
//     } else {
//         res.redirect('/login')
//     }
// }

// module.exports = { checkAuth }