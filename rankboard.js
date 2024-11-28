document.addEventListener("DOMContentLoaded", () => {
    const rankboardData = JSON.parse(localStorage.getItem('rankboardData')) || [];
    const rankboardContainer = document.getElementById("leaderboard");
    const courseFilter = document.getElementById("courseFilter");

    // Populate the course dropdown with unique course names
    const uniqueCourses = [...new Set(rankboardData.map(entry => entry.course))];
    uniqueCourses.forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseFilter.appendChild(option);
    });

    // Function to render the rank board based on the selected course
    function renderRankBoard(selectedCourse) {
        // Filter data based on the selected course
        const filteredData = selectedCourse === "all" 
            ? rankboardData 
            : rankboardData.filter(entry => entry.course === selectedCourse);

        // Sort data by skill rating
        filteredData.sort((a, b) => b.skillRating - a.skillRating);

        // Generate HTML for leaderboard rows
        rankboardContainer.innerHTML = `
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Course</th>
                <th>Score</th>
                <th>Skill Rating</th>
            </tr>
            ${filteredData.map((entry, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${entry.username}</td>
                    <td>${entry.course}</td>
                    <td>${entry.score}</td>
                    <td>${entry.skillRating}</td>
                </tr>
            `).join('')}
        `;
    }

    // Initial rendering of rank board with all data
    renderRankBoard("all");

    // Event listener to update the rank board when the course filter changes
    courseFilter.addEventListener("change", () => {
        renderRankBoard(courseFilter.value);
    });
});
