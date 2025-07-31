// ข้อมูล API
const API_URL = 'https://script.google.com/macros/s/AKfycbx_6z4PwBswdj0dS8PiytLppmC1DLAzHXDOz4PuE3pouRQRhfnT_ulwgUEPEcyOtCKcaw/exec';

// ฟังก์ชันสำหรับการล็อกอิน
document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบว่าอยู่ในหน้าล็อกอินหรือแดชบอร์ด
    if (document.getElementById('loginForm')) {
        // หน้าล็อกอิน
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // ตรวจสอบการล็อกอิน
            checkLogin(username, password);
        });
    } else if (document.getElementById('logoutBtn')) {
        // แดชบอร์ด
        updateDateTime();
        setInterval(updateDateTime, 1000);
        
        // ออกจากระบบ
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = '/login/index.html';
        });
        
        // โหลดข้อมูลผู้ใช้
        loadUserData();
    }
});

// ฟังก์ชันตรวจสอบการล็อกอิน
async function checkLogin(username, password) {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // ค้นหาผู้ใช้
        const user = data.find(item => item['รหัส น.ศ.'] == username && item['รหัส น.ศ.'] == password);
        
        if (user) {
            // บันทึกข้อมูลผู้ใช้และเปลี่ยนหน้า
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = '/login/dashboard.html';
        } else {
            alert('รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
}

// ฟังก์ชันโหลดข้อมูลผู้ใช้
// ในฟังก์ชัน loadUserData() ให้แก้ไขส่วนที่สร้างตารางคะแนนเป็นดังนี้:

async function loadUserData() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
        window.location.href = '/login/index.html';
        return;
    }
    
    // แสดงข้อมูลผู้ใช้
    document.getElementById('studentName').textContent = loggedInUser['ชื่อ-นามสกุล'];
    document.getElementById('studentId').textContent = loggedInUser['รหัส น.ศ.'];
    document.getElementById('studentTeam').textContent = loggedInUser['ทีม'];
    document.getElementById('totalScore').textContent = loggedInUser['รวม'];
    
    // สร้างตารางคะแนน
    const scoreTableBody = document.getElementById('scoreTableBody');
    scoreTableBody.innerHTML = '';
    
    // กำหนดชื่อหัวข้อตามเงื่อนไข
    const topicNames = {
        '1': 'สอบครั้งที่ 1',
        '2': 'สอบครั้งที่ 2',
        '3': 'สอบครั้งที่ 3',
        '4': 'สอบครั้งที่ 4',
        '5': 'สอบครั้งที่ 5',
        '6': 'สอบครั้งที่ 6',
        '7': 'สอบครั้งที่ 7',
        '8': 'กลางภาค',
        '9': 'ปลายภาค'
    };
    
    // เพิ่มคะแนนแต่ละหัวข้อ (เฉพาะสอบครั้งที่ 1-9)
    for (let i = 1; i <= 9; i++) {
        const scoreKey = i.toString();
        const scoreValue = loggedInUser[scoreKey];
        
        const row = document.createElement('tr');
        
        const cellIndex = document.createElement('td');
        cellIndex.textContent = i;
        row.appendChild(cellIndex);
        
        const cellTopic = document.createElement('td');
        cellTopic.textContent = topicNames[scoreKey] || `สอบครั้งที่ ${i}`;
        row.appendChild(cellTopic);
        
        const cellScore = document.createElement('td');
        cellScore.textContent = scoreValue || '-';
        row.appendChild(cellScore);
        
        const cellStatus = document.createElement('td');
        const statusSpan = document.createElement('span');
        
        if (scoreValue && scoreValue !== '') {
            statusSpan.textContent = 'เสร็จสิ้น';
            statusSpan.className = 'status completed';
        } else {
            statusSpan.textContent = 'ยังไม่เสร็จ';
            statusSpan.className = 'status pending';
        }
        
        cellStatus.appendChild(statusSpan);
        row.appendChild(cellStatus);
        
        scoreTableBody.appendChild(row);
    }
}
// ฟังก์ชันอัพเดทวันที่และเวลา
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeStr = now.toLocaleDateString('th-TH', options);
    document.getElementById('currentDateTime').textContent = dateTimeStr;
}
