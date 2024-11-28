document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const chatContainer = document.getElementById("chatContainer");
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const chatList = document.getElementById("chatList");
    const recipientName = document.getElementById("recipientName");

    // Dummy Data: Users and Messages
    const users = [
        { id: 1, username: "JobProvider123" },
        { id: 2, username: "JobSeeker456" },
    ];

    const messages = {
        1: [
            { sender: "JobProvider123", message: "Hello, are you available for this role?" },
            { sender: "JobSeeker456", message: "Yes, I am interested!" },
        ],
        2: [
            { sender: "JobProvider123", message: "Can we discuss more about your resume?" },
        ],
    };

    let activeChatId = null;

    // Populate Inbox
    function populateInbox() {
        chatList.innerHTML = users
            .map(user => `<li data-id="${user.id}" class="chat-user">${user.username}</li>`)
            .join("");
    }

    // Load Chat
    function loadChat(userId) {
        activeChatId = userId;
        const user = users.find(u => u.id === userId);
        recipientName.textContent = user.username;

        const chatMessages = messages[userId] || [];
        chatContainer.innerHTML = chatMessages
            .map(msg => `<div class="chat-message"><strong>${msg.sender}:</strong> ${msg.message}</div>`)
            .join("");
    }

    // Send Message
    function sendMessage(event) {
        event.preventDefault();
        const text = messageInput.value.trim();
        if (!text || !activeChatId) return;

        // Save message to messages object
        const user = users.find(u => u.id === activeChatId);
        if (!messages[activeChatId]) messages[activeChatId] = [];
        messages[activeChatId].push({ sender: "You", message: text });

        // Display new message
        chatContainer.innerHTML += `<div class="chat-message"><strong>You:</strong> ${text}</div>`;
        messageInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Event Listeners
    chatList.addEventListener("click", (e) => {
        if (e.target.classList.contains("chat-user")) {
            const userId = parseInt(e.target.getAttribute("data-id"));
            loadChat(userId);
        }
    });

    messageForm.addEventListener("submit", sendMessage);

    // Initialize Inbox
    populateInbox();
});
