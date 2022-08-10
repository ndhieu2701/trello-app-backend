const listApi = require('./list')
const taskApi = require('./task')
const boardApi = require('./board')


function route(app) {
    app.use('/api/list', listApi)
    app.use('/api/task', taskApi)
    app.use('/api/board', boardApi)
}

module.exports = route