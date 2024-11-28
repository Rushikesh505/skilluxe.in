const industryCourses = {
    "IT": ["Software Developer", "Data Scientist", "Cybersecurity", "DevOps Engineer"],
    "Healthcare": ["Nursing", "Pharmacist", "Medical Technician"],
    "Finance": ["Financial Analyst", "Accountant", "Auditor"],
    "Engineering": ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"],
    "Marketing": ["Digital Marketing", "SEO Specialist", "Market Analyst"]
};

const experienceLevelButtons = document.querySelectorAll(".experience button");
const employmentButtons = document.querySelectorAll(".employment button");
let selectedExperience = "";
let selectedEmployment = [];

// Update course options based on selected industry
function updateCourseOptions() {
    const industry = document.getElementById("industry").value;
    const courseSelect = document.getElementById("course");
    courseSelect.innerHTML = "<option value=''>Select Course</option>";
    
    if (industryCourses[industry]) {
        industryCourses[industry].forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });
    }
}

// Select experience level and apply the blue style when selected
function selectExperienceLevel(level) {
    selectedExperience = level;
    experienceLevelButtons.forEach(btn => btn.classList.remove("selected"));
    document.querySelector(`.experience button[onclick="selectExperienceLevel('${level}')"]`).classList.add("selected");
}

// Toggle employment type selection and apply blue style when selected
function toggleEmployment(employmentType) {
    const button = document.querySelector(`.employment button[onclick="toggleEmployment('${employmentType}')"]`);
    
    if (selectedEmployment.includes(employmentType)) {
        selectedEmployment = selectedEmployment.filter(type => type !== employmentType);
        button.classList.remove("selected");
    } else {
        selectedEmployment.push(employmentType);
        button.classList.add("selected");
    }
}

// Start skill test if industry and course are selected
function startTest() {
    const industry = document.getElementById("industry").value;
    const course = document.getElementById("course").value;
    
    if (industry && course) {
        // Redirect to the skill test page with selected course and industry details
        window.location.href = `skilltest.html?industry=${encodeURIComponent(industry)}&course=${encodeURIComponent(course)}`;
    } else {
        alert("Please select an industry and course.");
    }
}

// Retrieve and display username in the profile menu
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username").textContent = username;
    }
});

// Toggle profile menu display
function toggleProfileMenu() {
    const profileMenu = document.getElementById("profileMenu");
    profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
}

// Logout function to clear user data and redirect to main page
function logout() {
    localStorage.removeItem("username"); // Clear username
    window.location.href = "index.html"; // Redirect to main page or landing page
}

// Close profile menu when clicking outside of it
document.addEventListener("click", function(event) {
    const profileBtn = document.querySelector(".profile-btn");
    const profileMenu = document.getElementById("profileMenu");

    if (profileMenu.style.display === "block" && !profileBtn.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.style.display = "none";
    }
});
