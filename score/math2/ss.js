// ให้ A ทุกระดับความยาก อยู่ที่ 96 คะแนน
// เงื่อรไข F คือ ทำข้อที่ทำได้ ไม่ถึง 10 คะแนน
// นำ "คะแนนข้อที่ทำได้" รวม 50 คะแนนนำมา คูณ 4 หาร 5 แล้วนำค่านี้ไปรวมกับคะแนนเก็บเพื่อคำนวณเกรดอิงกลุ่ม ดังนั้น F มีกรณีเดียว

// -----------------------------
// CONFIG
// -----------------------------

const difficultyBonus = {
    easy: 17.5,
    normal: 21,
    hard: 24.5
};

let currentDifficulty = "normal";

const baseMean = 50;
const sd = 7;

const MAX_A_SCORE = 95;


// -----------------------------
// คำนวณเกณฑ์เกรด
// -----------------------------

function calculateGradeCriteria(difficulty) {

    const bonus = difficultyBonus[difficulty];
    const newMean = baseMean + bonus;

    const A = MAX_A_SCORE;

    return {
        A: A,
        "B+": A - 1 * sd,
        B: A - 1.5 * sd,
        "C+": newMean,
        C: newMean - 0.5 * sd,
        D: newMean - 1 * sd
    };
}


// -----------------------------
// แสดงเกณฑ์ในตาราง
// -----------------------------

function displayGradeCriteria(criteria) {

    const tableBody = document.getElementById("gradeCriteriaBody");
    tableBody.innerHTML = "";

    const row = document.createElement("tr");

    row.innerHTML = `
                <td>คะแนน</td>
                <td>${criteria.A.toFixed(2)} ขึ้นไป</td>
                <td>${criteria["B+"].toFixed(2)} - ${(criteria.A - 0.01).toFixed(2)}</td>
                <td>${criteria.B.toFixed(2)} - ${(criteria["B+"] - 0.01).toFixed(2)}</td>
                <td>${criteria["C+"].toFixed(2)} - ${(criteria.B - 0.01).toFixed(2)}</td>
                <td>${criteria.C.toFixed(2)} - ${(criteria["C+"] - 0.01).toFixed(2)}</td>
                <td>${criteria.D.toFixed(2)} - ${(criteria.C - 0.01).toFixed(2)}</td>
                <td>ต่ำกว่า ${criteria.D.toFixed(2)}</td>
            `;

    tableBody.appendChild(row);
}


// -----------------------------
// คำนวณเกรด
// -----------------------------

function calculateGrade(totalScore, criteria) {

    if (totalScore >= criteria.A) return "A";
    if (totalScore >= criteria["B+"]) return "B+";
    if (totalScore >= criteria.B) return "B";
    if (totalScore >= criteria["C+"]) return "C+";
    if (totalScore >= criteria.C) return "C";
    if (totalScore >= criteria.D) return "D";

    return "F";
}


// -----------------------------
// รวมคะแนนจาก Checkbox
// -----------------------------

function calculateRawExamScore() {

    let score = 0;

    document
        .querySelectorAll('input[type="checkbox"]:checked')
        .forEach(cb => {

            score += parseFloat(cb.value);

        });

    return score;
}


// -----------------------------
// ปุ่มเลือกระดับความยาก
// -----------------------------

document.querySelectorAll(".difficulty-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        document
            .querySelectorAll(".difficulty-btn")
            .forEach(b => b.classList.remove("active"));

        this.classList.add("active");

        currentDifficulty = this.dataset.level;

        const criteria = calculateGradeCriteria(currentDifficulty);

        displayGradeCriteria(criteria);

    });

});


// -----------------------------
// Submit Form
// -----------------------------

document.getElementById("gradeForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const studentId = document.getElementById("studentId").value;

    const rawExamScore = calculateRawExamScore();

    document.getElementById("loading").style.display = "block";
    document.getElementById("submitBtn").disabled = true;

    try {

        const response = await fetch("math2.json");

        if (!response.ok) {
            throw new Error("โหลดข้อมูลนักศึกษาไม่ได้");
        }

        const users = await response.json();

        const student = users[studentId];

        if (!student) {

            alert("ไม่พบรหัสนักศึกษานี้");

            return;
        }

        // แปลงคะแนนสอบ
        const examScore = (rawExamScore * 4) / 5;

        // คะแนนรวม
        const totalScore = student.assignmentScore + examScore;

        const criteria = calculateGradeCriteria(currentDifficulty);

        let grade;

        // เงื่อนไข F
        if (rawExamScore < 10) {

            grade = "F";

        } else {

            grade = calculateGrade(totalScore, criteria);

        }

        // แสดงผล

        document.getElementById("studentInfo").textContent =
            `${student.name} (รหัส ${studentId})`;

        document.getElementById("finalGrade").textContent = grade;

        document.getElementById("totalScore").textContent =
            `คะแนนรวม ${totalScore.toFixed(2)} คะแนน`;

        document.getElementById("assignmentScore").textContent =
            student.assignmentScore.toFixed(2);

        document.getElementById("examScoreValue").textContent =
            examScore.toFixed(2);

        document.getElementById("totalScoreValue").textContent =
            totalScore.toFixed(2);

        displayGradeCriteria(criteria);

        document.getElementById("resultSection").style.display = "block";

        document
            .getElementById("resultSection")
            .scrollIntoView({ behavior: "smooth" });

    }

    catch (error) {

        console.error(error);

        alert("เกิดข้อผิดพลาด : " + error.message);

    }

    finally {

        document.getElementById("loading").style.display = "none";
        document.getElementById("submitBtn").disabled = false;

    }

});


// -----------------------------
// โหลดเกณฑ์ตอนเปิดหน้า
// -----------------------------

document.addEventListener("DOMContentLoaded", function () {

    const criteria = calculateGradeCriteria(currentDifficulty);

    displayGradeCriteria(criteria);

});