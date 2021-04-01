const {connect} = require('mongoose')

module.exports = async () => {
    try {
        const connection = await connect(process.env.MONGO_URI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: true,
                useCreateIndex: true
            }
            )
        console.log(`Connected to database: http://${connection.connections[0].host}:${connection.connections[0].port}`)
    } catch (e) {
        console.log(`Error while connecting to MongoDB: ${e.message}`)
    }
}
