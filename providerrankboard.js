document.addEventListener("DOMContentLoaded", () => {
    const rankboardData = JSON.parse(localStorage.getItem('rankboardData')) || [];
    const rankboardContainer = document.getElementById("leaderboard");
    const courseFilter = document.getElementById("courseFilter");
    const chatInterface = document.getElementById("chatInterface");
    const chatUsernameElement = document.getElementById("chatUsername");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");
    const closeChatBtn = document.getElementById("closeChatBtn");

    // Populate the course dropdown with unique courses
    const uniqueCourses = [...new Set(rankboardData.map(entry => entry.course))];
    uniqueCourses.forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseFilter.appendChild(option);
    });

    // Function to render the rank board based on selected course
    function renderRankBoard(selectedCourse) {
        const filteredData = selectedCourse === "all" 
            ? rankboardData 
            : rankboardData.filter(entry => entry.course === selectedCourse);

        filteredData.sort((a, b) => b.skillRating - a.skillRating);

        rankboardContainer.innerHTML = `
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Course</th>
                <th>Score</th>
                <th>Skill Rating</th>
                <th>Chat</th>
            </tr>
            ${filteredData.map((entry, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${entry.username}</td>
                    <td>${entry.course}</td>
                    <td>${entry.score}</td>
                    <td>${entry.skillRating}</td>
                    <td><button class="chatBtn" data-username="${entry.username}">Chat</button></td>
                </tr>
            `).join('')}
        `;

        // Attach event listener for chat buttons
        document.querySelectorAll(".chatBtn").forEach(button => {
            button.addEventListener("click", () => {
                openChat(button.dataset.username);
            });
        });
    }

    // Open chat interface
    function openChat(username) {
        chatUsernameElement.textContent = username;
        chatMessages.innerHTML = ""; // Clear previous messages
        chatInterface.style.display = "block";
    }

    // Send message
    sendMessageBtn.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatInput.value = ""; // Clear input field
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
        }
    });

    // Close chat
    closeChatBtn.addEventListener("click", () => {
        chatInterface.style.display = "none";
    });

    // Initial render of the rank board
    renderRankBoard("all");

    // Filter by course
    courseFilter.addEventListener("change", () => {
        renderRankBoard(courseFilter.value);
    });
});
