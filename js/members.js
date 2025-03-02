// ฟังก์ชันดึงข้อมูลข่าวจาก API และแสดงผลในหน้าเว็บ
async function fetchMembers() {
    try {
        // ดึงข้อมูลจาก API
        const response = await fetch('https://script.google.com/macros/s/AKfycbyDDltmDH-N1iuJSnnZq_QjuDqWgtRnTGJgoAJYsNmVBlsfTfCiag4xvkx02Ju665RD/exec');
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
    membersData.forEach(({ link, image, name, surname, fromS, province }) => {
        const membersItem = `
            <div class="col-4">
                <div class="single-members-item">
                    <a href="${link}" class="image">
                        <img fetchpriority="high" decoding="async" src="${image}" alt="" class="img-fluid">
                    </a>
                    <div class="info mt-3">
                        <div class="writer mb-3">
                            <span class="date d-inline-block"><b>${name}</b> (${surname ?? ''})</span>
                            <span class="date d-inline-block"><b>${fromS}</b> (${province})</span>
                        </div>
                        <a href="${link}" class="d-inline-block mt-3 mb-5">เพิ่มเติม</a>
                    </div>
                </div>
            </div>`;
        membersContainer.insertAdjacentHTML('beforeend', membersItem); // เพิ่ม HTML ลงในหน้า
    });
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', fetchMembers);
