document.addEventListener("DOMContentLoaded", () => {
    const jobPostForm = document.getElementById("jobPostForm");

    jobPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("jobTitle").value;
        const description = document.getElementById("jobDescription").value;
        const skills = document.getElementById("jobSkills").value;
        const salary = document.getElementById("jobSalary").value;

        const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        jobs.push({ title, description, skills, salary });
        localStorage.setItem("jobs", JSON.stringify(jobs));

        alert("Job posted successfully!");
        renderPostedJobs();
    });

    // Render posted jobs
    const postedJobsContainer = document.getElementById("postedJobs");
    function renderPostedJobs() {
        const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        postedJobsContainer.innerHTML = jobs.map(job => `
            <div>
                <p><strong>${job.title}</strong></p>
                <p>${job.description}</p>
                <p>Skills: ${job.skills}</p>
                <p>Salary: ${job.salary}</p>
            </div>
        `).join('');
    }

    renderPostedJobs();
});
