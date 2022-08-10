const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/trello_app');
        console.log('success!');
    } catch (error) {
        console.log('error!!');
    }
}

module.exports = { connect };