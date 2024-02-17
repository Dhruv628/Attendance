function submitAttendance() {
    var studentName = document.getElementById('studentName').value;
    var rollNumber = document.getElementById('rollNumber').value; // Add this line to get roll number
    var attendanceStatus = document.getElementById('attendanceStatus').value;

    fetch('/submit-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, rollNumber, attendanceStatus }), // Include roll number in the request
    })
    .then(response => response.json())
    .then(data => {
        var statusElement = document.getElementById('status');

        if (data.message) {
            // Successful submission
            statusElement.innerHTML = data.message;

            // Redirect to Attendance List page
            goToAttendanceList();
        } else if (data.error) {
            // Server error
            statusElement.innerHTML = data.error;
        } else {
            // Unexpected response format
            statusElement.innerHTML = 'Unexpected response from the server';
        }
    })
    .catch(error => console.error('Error:', error));
}

// ... (existing code)



function getAttendance() {
    fetch('/get-attendance')
    .then(response => response.json())
    .then(data => {
        var attendanceListElement = document.getElementById('attendanceList');
        if (data.length === 0) {
            attendanceListElement.innerHTML = 'No attendance records found.';
        } else {
            attendanceListElement.innerHTML = '<h2>Attendance Records:</h2>';
            data.forEach(record => {
                attendanceListElement.innerHTML += `<p>${record.studentName}: ${record.attendanceStatus}</p>`;
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

function showSubmitAttendancePage() {
    document.getElementById('attendanceFormPage').style.display = 'block';
    document.getElementById('attendanceListPage').style.display = 'none';
}

function showGetAttendancePage() {
    document.getElementById('attendanceFormPage').style.display = 'none';
    document.getElementById('attendanceListPage').style.display = 'block';
    getAttendance();
}

function goToAttendanceList() {
    window.location.href = '/attendance-list.html';
}
