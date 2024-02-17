document.addEventListener("DOMContentLoaded", function () {
    fetchAttendanceList();
});

function fetchAttendanceList() {
    fetch("/get-attendance")
        .then(response => response.json())
        .then(data => {
            const attendanceListTable = document.getElementById("attendanceList").getElementsByTagName('tbody')[0];

            data.forEach(entry => {
                const row = attendanceListTable.insertRow();
                const nameCell = row.insertCell(0);
                const rollNumberCell = row.insertCell(1);
                const statusCell = row.insertCell(2);

                nameCell.textContent = entry.studentName;
                rollNumberCell.textContent = entry.rollNumber;
                statusCell.textContent = entry.attendanceStatus; // Fix this line
            });
        })
        .catch(error => console.error("Error fetching attendance list:", error));
}
