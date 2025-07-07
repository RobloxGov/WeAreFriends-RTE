// เป้าหมาย: 25 สิงหาคม 2568 เวลา 09:30 (ต้องแปลงเป็น ค.ศ. = 2025 + 543 = 2568 --> 2025)
const targetDate = new Date("2025-08-25T09:30:00+07:00");

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("date-countdown").textContent = "0";
        document.getElementById("time-countdown").textContent = "หมดเวลา";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("date-countdown").textContent = days;
    document.getElementById("time-countdown").textContent =
        `${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

