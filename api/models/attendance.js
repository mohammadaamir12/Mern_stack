const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    date: { 
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }

})

const attendance = mongoose.model("attendance", attendanceSchema)

module.exports = attendance;