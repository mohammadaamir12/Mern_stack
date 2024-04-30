const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const moment=require('moment')

const app = express();
const port = 7000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/asad").then(() => {
    console.log("mongodb is connected");
}).catch((error) => {
    console.log("error to connect with database", error.message);
});

app.listen(port, () => {
    console.log("Database is running on port 7000");
});

const Employee=require('./models/employee')
const Attendance=require('./models/attendance')

app.post("/addEmployee",async(req,res)=>{
    try {
      const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address
      } =req.body; 
      // create new employee
      const newEmployee=new Employee({
        employeeName,
        employeeId,
        designation,
        phoneNumber,
        dateOfBirth,
        joiningDate,
        activeEmployee,
        salary,
        address
      });
      await newEmployee.save();

      res.status(201).json({message:'Employee saved successfully',employee:newEmployee,status:'Success'})
    } catch (error) {
       console.log("Error creating employee",error);
       res.status(500).json({message:'Failed to add employee'}) 
    }
})

// fetch all employees
app.get("/employees",async(req,res)=>{
    try {
       const employees=await Employee.find();
       res.status(200).json({status:'Success',all:employees}) 
    } catch (error) {
        res.status(500).json({message:'Failed to get employee details'})
    }
})

app.post('/attendance',async(req,res)=>{
    try {
        const {employeeId,employeeName,date,status}=req.body;
        const existingAttendence=await Attendance.findOne({employeeId,date});

        if(existingAttendence){
            existingAttendence.status=status;
            await existingAttendence.save();
            res.status(200).json(existingAttendence)
        }else{
            const newAttendance =new Attendance({
                employeeId,
                employeeName,
                date,
                status
            })
            await newAttendance.save();
            res.status(200).json(newAttendance)
        }
    } catch (error) {
        res.status(500).json({message:'Unavailable to mark attendance'})  
    }
})

app.get('/attendance',async (req,res)=>{
    try {
       const {date}=req.query;
       const attendanceData=await Attendance.find({date:date})
       res.status(200).json(attendanceData) 
    } catch (error) {
        res.status(500).json({message:'Unavailable to fetch attendance'})  
        
    }
})

app.get("/Allattendancereport", async (req, res) => {
    try {
        const { month, year } = req.query;
        console.log('parameters', month, year);
        const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD").startOf("month").toDate();
        const endDate = moment(startDate).endOf("month").toDate();
        const report = await Attendance.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $month: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(month)
                                ],
                            },
                            {
                                $eq: [
                                    { $year: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(year)
                                ],
                            },
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$employeeId",
                    present: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
                        },
                    },
                    absent: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
                        }
                    },
                    holiday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
                        }
                    },
                    halfday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
                        }
                    },
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: 'employeeId',
                    as: "employeeDetails"
                }
            },
            {
                $unwind: "$employeeDetails",
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    halfday: 1,
                    name: "$employeeDetails.employeeName",
                    designation: "$employeeDetails.designation",
                    salary: "$employeeDetails.salary",
                    employeeId: "$employeeDetails.employeeId",
                },
            },
        ]);

        res.status(200).json({ report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching summary report" });
    }
});

// app.get("/Allattendancereport",async(req,res)=>{
//     try {
//        const {month,year}=req.query;
//        console.log('parameterds',month,year)
//        const startDate =moment(`${year}-${month}-01`,"YYYY-MM-DD").startOf("month").toDate();
//        const endDate=moment(startDate).endOf("month").toDate();
//        const report=await Attendance.aggregate([
//         {
//             $match:{
//                 $expr:{
//                     $and:[
//                         {
//                             $eq:[
//                                 {
//                                     $month:{$dateFromString:{dateString:"$date"}},
//                                 },
//                                 parseInt(req.query.month)
//                             ],
//                         },
//                         {
//                             $eq:[
//                                 {
//                                     $year:{$dateFromString:{dateString:"$date"}}
//                                 },
//                                 parseInt(req.query.year)
//                             ],
//                         },
//                     ]
//                 }
//             }
//         },
//         {
//             $group:{
//                 _id:"$employeeId",
//                 present:{
//                     $sum:{
//                         $cond:{if:{$eq:["status","present"]},then:1,else:0},
//                     },
//                 },
//                 absent:{
//                     $sum:{
//                         $cond:{if:{$eq:["status","absent"]},then:1,else:0},

//                     }
//                 },
//                 holiday:{
//                     $sum:{
//                         $cond:{if:{$eq:["status","holiday"]},then:1,else:0},

//                     }
//                 },
//                 halfday:{
//                     $sum:{
//                         $cond:{if:{$eq:["status","halfday"]},then:1,else:0},

//                     }
//                 },
//             },
//         },
//         {
//             $lookup:{
//              from:"employees",
//              localField:"_id",
//              foreignField:'employeeId',
//              as:"employeeDetails"
//             }
//         },{
//             $unwind:"$employeeDetails",
//         },
//         {
//             $project:{
//               _id:1,
//               present:1,
//               absent:1,
//               halfday:1,
//               name:"$employeeDetails.employeeName",
//               designation:"$employeeDetails.designation",
//               salary:"$employeeDetails.salary",
//               employeeId:"$employeeDetails.employeeId",
//             },
//         },
        
//        ]);
//        res.status(200).json({report})
//     } catch (error) {
//         res.status(500).json({message:"error fetching summary report"})  
        
//     }
// })
// app.get("/Allattendancereport", async (req, res) => {
//     try {
//         const { month, year } = req.query;
//         const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD").startOf('month').toDate();
//         const endDate = moment(startDate).endOf("month").toDate();
//         const report = await Attendance.aggregate([
//             {
//                 $match: {
//                     date: {
//                         $gte: startDate,
//                         $lte: endDate
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$employeeId",
//                     present: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
//                         },
//                     },
//                     absent: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
//                         }
//                     },
//                     holiday: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
//                         }
//                     },
//                     halfday: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
//                         }
//                     },
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "employees",
//                     localField: "_id",
//                     foreignField: 'employeeId',
//                     as: "employeeDetails"
//                 }
//             },
//             {
//                 $unwind: "$employeeDetails",
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     present: 1,
//                     absent: 1,
//                     halfday: 1,
//                     name: "$employeeDetails.employeeName",
//                     designation: "$employeeDetails.designation",
//                     salary: "$employeeDetails.salary",
//                     employeeId: "$employeeDetails.employeeId",
//                 },
//             },
//         ]);
//         res.status(200).json({ report });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Unable to fetch summary report' });
//     }
// });