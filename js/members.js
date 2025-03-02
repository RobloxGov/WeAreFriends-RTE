// ฟังก์ชันดึงข้อมูลข่าวจาก API และแสดงผลในหน้าเว็บ
async function fetchMembers() {
    try {
        // ดึงข้อมูลจาก API
        const response = await fetch('https://script.google.com/macros/s/AKfycbxwJ8IIJRjWvyQAuvAJ6Qsam6ut_kmLDabLSFS_h7jop4UgfWpEqQQm7fC0mlCow-PZ/exec');
        const data = await response.json();

        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (Array.isArray(data) && data.length > 0) {
            renderMembers(data); // เรียกฟังก์ชันแสดงข้อมูล
        } else {
            console.error('ไม่มีข้อมูลสมาชิก');
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
}

// ฟังก์ชันแสดงข้อมูลสมาชิกในหน้าเว็บ
function renderMembers(membersData) {
    const membersContainer = document.getElementById('members'); // ค้นหา element id="members"
    membersContainer.innerHTML = ''; // ล้างเนื้อหาเก่า

    // สร้าง HTML สำหรับแต่ละสมาชิก
    membersData.forEach(({ link, image, name, surname, fromS, province, round,content }) => {
        const membersItem = `
            <div class="col-12">
                <div class="single-members-item">
                    <img fetchpriority="high" decoding="async" src="${image}" alt="" class="img-fluid">
                    <div class="info mt-3">
                        <div class="writer mb-3">
                            <span class="date d-inline-block"><b>${name}</b> (${surname ?? ''})</span>
                            <span class="date d-inline-block"><b>${fromS}</b> ${province}</span>
                            <span class="date d-inline-block"><b>วิศวกรรมศาสตร์</b> วิศวกรรมขนส่งทางราง</span>
                            <span class="date d-inline-block"><b>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</b></span>
                            <span class="date d-inline-block"><b>TCAS68 - ${round}</b></span>
                            <span class="date d-inline-block"><a href="${link}">${content}</a></span>
                        </div>
                    </div>
                </div>
            </div>`;
        membersContainer.insertAdjacentHTML('beforeend', membersItem); // เพิ่ม HTML ลงในหน้า
    });
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', fetchMembers);
