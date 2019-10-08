const {connectionPool} = require('./connection.js')

connectionPool.query('DROP TABLE IF EXISTS dogs;', (error, results) => {
    if (error) {
        console.log(error.message)
        process.exit()
    } else {
        console.log('Success: Dog table dropped')
        
        connectionPool.query('CREATE TABLE dog (name VARCHAR(255) NOT NULL, description TEXT, dog_id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (dog_id))', (error, results) => {
            if (error) {
                console.log(error.message)
                process.exit()
            } else {
                console.log('Success: Dog table created')
                connectionPool.end((error) => {})
            }  
            process.exit()
        })
    }
})