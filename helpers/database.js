if (process.env.NODE_ENV  === 'production') {
            module.exports = {
                host: 'ck.codingkeeda.com',
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
    
