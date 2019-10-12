if (process.env.NODE_ENV  === 'production') {
            module.exports = {
    host: process.env.HOST,
    user: process.env.DU,
    password: process.env.DP,
    database: process.env.DBNAME
  };
        } else {
            module.exports = {
                host: '127.0.0.1',
                user: 'root',
                password: "",
                database: "ckapp"
            }
        }
    
