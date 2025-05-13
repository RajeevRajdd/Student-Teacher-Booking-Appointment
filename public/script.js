
function showStudentView() {
    document.getElementById('studentView').style.display = 'block';
    document.getElementById('teacherView').style.display = 'none';
    loadStudentAppointments();
}

function showTeacherView() {
    document.getElementById('studentView').style.display = 'none';
    document.getElementById('teacherView').style.display = 'block';
    loadTeacherAppointments();
}


async function loadStudentAppointments() {
    try {
        const response = await fetch('/api/appointments');
        const appointments = await response.json();
        const studentAppointments = document.getElementById('studentAppointments');
        studentAppointments.innerHTML = '';

        appointments.forEach(appointment => {
            const card = createAppointmentCard(appointment);
            studentAppointments.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}


async function loadTeacherAppointments() {
    try {
        const todayResponse = await fetch('/api/appointments/today');
        const todayAppointments = await todayResponse.json();
        const todayContainer = document.getElementById('todayAppointments');
        todayContainer.innerHTML = '';

        todayAppointments.forEach(appointment => {
            const card = createAppointmentCard(appointment, true);
            todayContainer.appendChild(card);
        });

        const allResponse = await fetch('/api/appointments');
        const allAppointments = await allResponse.json();
        const pendingAppointments = allAppointments.filter(apt => apt.status === 'Pending');
        const pendingContainer = document.getElementById('pendingAppointments');
        pendingContainer.innerHTML = '';

        pendingAppointments.forEach(appointment => {
            const card = createAppointmentCard(appointment, true);
            pendingContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

function createAppointmentCard(appointment, isTeacher = false) {
    const card = document.createElement('div');
    card.className = `appointment-card ${appointment.status.toLowerCase()}`;
    
    const date = new Date(appointment.date).toLocaleDateString();
    const time = appointment.time;

    card.innerHTML = `
        <h3>Appointment with ${isTeacher ? appointment.studentName : appointment.teacherName}</h3>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Purpose: ${appointment.purpose}</p>
        <span class="status-badge status-${appointment.status.toLowerCase()}">${appointment.status}</span>
    `;

    if (isTeacher && appointment.status === 'Pending') {
        const actions = document.createElement('div');
        actions.className = 'appointment-actions';
        actions.innerHTML = `
            <button onclick="updateAppointmentStatus('${appointment._id}', 'Accepted')">Accept</button>
            <button onclick="updateAppointmentStatus('${appointment._id}', 'Rejected')">Reject</button>
        `;
        card.appendChild(actions);
    }

    return card;
}

async function updateAppointmentStatus(id, status) {
    try {
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            loadTeacherAppointments();
        } else {
            console.error('Error updating appointment status');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const appointment = {
        studentName: 'Current Student', // In a real app, this would come from authentication
        teacherName: document.getElementById('teacherName').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        purpose: document.getElementById('purpose').value
    };

    try {
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        });

        if (response.ok) {
            document.getElementById('appointmentForm').reset();
            loadStudentAppointments();
        } else {
            console.error('Error creating appointment');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

showStudentView(); 