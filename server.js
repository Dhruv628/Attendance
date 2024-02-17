const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb+srv://sharmaaniket682:I9Zrgp4eRHlkCUI4@cluster0.nkzorwo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  }).catch((err)=>{
    console.log(err)
  });

  const Attendance = mongoose.model('Attendance', {
    studentName: String,
    rollNumber: String, // New field for roll number
    attendanceStatus: String,
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/attendance-list.html', (req, res) => {
    res.sendFile(__dirname + '/attendance-list.html');
});

app.post('/submit-attendance', async (req, res) => {
    try {
        const { studentName, rollNumber, attendanceStatus } = req.body;

        // Check if a record with the given roll number already exists
        const existingAttendance = await Attendance.findOne({ rollNumber });

        if (existingAttendance) {
            // If exists, update the attendance status
            existingAttendance.attendanceStatus = attendanceStatus;
            await existingAttendance.save();
        } else {
            // If not exists, create a new record
            const attendance = new Attendance({ studentName, rollNumber, attendanceStatus });
            await attendance.save();
        }

        res.status(200).json({ message: 'Attendance submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get-attendance', async (req, res) => {
    try {
        const allAttendance = await Attendance.find();
        res.json(allAttendance);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});