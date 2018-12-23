if (process.env.NODE_ENV  === 'production') {
            module.exports = {
                host: '182.50.135.70',
                user: 'CK_APP',
                password: "CK_APP&@",
                database: "ckapp"
            }
        } else {
            module.exports = {
                host: '127.0.0.1',
                user: 'root',
                password: "",
                database: "ckapp"
            }
        }
    
