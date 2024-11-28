document.getElementById("providerSignupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const providerData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        companyName: document.getElementById("companyName").value,
        roleInCompany: document.getElementById("roleInCompany").value,
        companyDescription: document.getElementById("companyDescription").value,
        industryType: document.getElementById("industryType").value,
        location: document.getElementById("location").value
    };

    localStorage.setItem("providerData", JSON.stringify(providerData));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "providerLogin.html";
});
