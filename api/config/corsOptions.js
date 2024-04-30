const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
     return callback(null, true);
    } else {
     return callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;


// // corsOptions.js
// const allowedOrigins = require('./allowedOrigins');

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {  // Use includes for better readability
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"), false); // Explicitly pass false
//         }
//     },
//     credentials: true, // Necessary for sessions or basic auth
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// module.exports = corsOptions;
