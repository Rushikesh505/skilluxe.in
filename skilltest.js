// Questions database for various courses
const questions = {
    "Software Developer": [
        { question: "Which of the following is a high-level programming language?", options: ["Machine Code", "Assembly", "Python", "Binary"], answer: "Python" },
        { question: "Which of the following is used for version control?", options: ["Git", "SQL", "HTML", "CSS"], answer: "Git" },
        { question: "In Object-Oriented Programming, what does 'inheritance' mean?", options: ["Combining two classes", "Deriving a new class from an existing one", "Creating objects", "Hiding data"], answer: "Deriving a new class from an existing one" },
        { question: "Which SQL statement is used to fetch data from a database?", options: ["INSERT", "DELETE", "SELECT", "UPDATE"], answer: "SELECT" },
        { question: "Which of these is a front-end framework?", options: ["Django", "Node.js", "Angular", "Flask"], answer: "Angular" },
        { question: "What does 'API' stand for?", options: ["Application Programming Interface", "Applied Program Interface", "Application Process Integration", "Applied Processing Interface"], answer: "Application Programming Interface" },
        { question: "Which of these is NOT a JavaScript library or framework?", options: ["React", "Angular", "Vue", "PHP"], answer: "PHP" },
        { question: "Which HTTP method is used to send data to the server?", options: ["GET", "POST", "DELETE", "PATCH"], answer: "POST" },
        { question: "Which of these data structures is LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Array", "Tree"], answer: "Stack" },
        { question: "Which sorting algorithm has the best time complexity?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], answer: "Quick Sort" }
    ],
    "Nursing": [
        { question: "Which of these terms describes an abnormal heartbeat?", options: ["Bradycardia", "Tachycardia", "Arrhythmia", "Erythema"], answer: "Arrhythmia" },
        { question: "Which type of nurse provides anesthesia?", options: ["Registered Nurse (RN)", "Nurse Anesthetist", "Clinical Nurse Specialist", "Nurse Practitioner"], answer: "Nurse Anesthetist" },
        { question: "What does the acronym HIPAA stand for?", options: ["Health Insurance Privacy and Accountability Act", "Health Insurance Portability and Accountability Act", "Health Information Privacy Act", "Healthcare Insurance Portability Act"], answer: "Health Insurance Portability and Accountability Act" },
        { question: "What is the normal range for adult blood pressure?", options: ["80/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"], answer: "120/80 mmHg" }
    ],
    "Financial Analyst": [
        { question: "What is the primary goal of financial analysis?", options: ["To create a marketing plan", "To assess a company’s stability, solvency, and profitability", "To predict technological trends", "To manage HR policies"], answer: "To assess a company’s stability, solvency, and profitability" },
        { question: "Which financial statement shows a company’s assets and liabilities?", options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Retained Earnings Statement"], answer: "Balance Sheet" }
    ],
    "Mechanical Engineer": [
        { question: "Which law of thermodynamics states that energy cannot be created or destroyed?", options: ["Zeroth Law", "First Law", "Second Law", "Third Law"], answer: "First Law" },
        { question: "Which of the following is NOT a thermodynamic process?", options: ["Isothermal", "Isoenergetic", "Isobaric", "Adiabatic"], answer: "Isoenergetic" }
    ],
    "Digital Marketing": [
        { question: "What does SEO stand for?", options: ["Search Engine Optimization", "System Entry Operation", "Standard Execution Output", "Site Engine Optimization"], answer: "Search Engine Optimization" },
        { question: "Which platform is primarily used for professional networking?", options: ["Facebook", "LinkedIn", "Instagram", "Snapchat"], answer: "LinkedIn" }
    ]
};

// Initial setup
let timeLeft = 60;
let score = 0;
let currentQuestions = [];
let timerInterval;

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        document.getElementById("timeRemaining").textContent = --timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

// Load questions for selected course
function loadQuestions(course) {
    currentQuestions = questions[course] || [];
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = currentQuestions.map((q, i) => `
        <div class="question">
            <p>${i + 1}. ${q.question}</p>
            ${q.options.map(option => `
                <label><input type="radio" name="q${i}" value="${option}"> ${option}</label>
            `).join('')}
        </div>
    `).join('');
}

// Submit the test and calculate score and skill rating
function submitTest() {
    clearInterval(timerInterval);
    score = 0;
    currentQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) score++;
    });
    const totalQuestions = currentQuestions.length;
    const skillRating = Math.min(5, Math.round((score / totalQuestions) * 5));
    
    document.getElementById("score").textContent = `${score}/${totalQuestions}`;
    document.getElementById("skillRating").textContent = skillRating;
    document.getElementById("result").style.display = "block";

    // Store result data for Rankboard
    const username = localStorage.getItem('username');
    const course = new URLSearchParams(window.location.search).get("course");

    const testResult = {
        username: username,
        score: score,
        skillRating: skillRating,
        course: course
    };

    // Retrieve and update rankboard data in localStorage
    const rankboardData = JSON.parse(localStorage.getItem('rankboardData')) || [];
    rankboardData.push(testResult);
    localStorage.setItem('rankboardData', JSON.stringify(rankboardData));

    // Redirect to Rankboard after displaying results briefly
    setTimeout(() => {
        window.location.href = 'rankboard.html';
    }, 2000);
}

// Run code once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get("course");
    if (course && questions[course]) {
        loadQuestions(course);
        startTimer();
    } else {
        alert("Invalid course selection.");
    }
});
