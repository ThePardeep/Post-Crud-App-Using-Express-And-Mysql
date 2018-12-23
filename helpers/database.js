module.exports = {
    databaseUse: function () {
        if (process.env.node_) {
            return {
                host: 'localhost:3360',
                user: 'CK_APP',
                password: "CK_APP&@",
                database: "ckapp"
            }
        } else {
            return {
                host: 'localhost:3360',
                user: 'CK_APP',
                password: "CK_APP&@",
                database: "ckapp"
            }
        }
    }
}