// Handle Job Posting
function postJob(job) {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    alert("Job posted successfully!");
}

// Display Posted Jobs
function renderPostedJobs() {
    const postedJobsContainer = document.getElementById("postedJobs");
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (jobs.length === 0) {
        postedJobsContainer.innerHTML = "<p>No jobs posted yet.</p>";
    } else {
        postedJobsContainer.innerHTML = jobs.map(job => `
            <div class="job-post">
                <h3>${job.title}</h3>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Required Skills:</strong> ${job.skills}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
            </div>
        `).join('');
    }
}

// Handle Shortlisted Candidates
function renderShortlist() {
    const shortlistContainer = document.getElementById("shortlistContainer");
    const shortlisted = JSON.parse(localStorage.getItem("shortlist")) || [];

    if (shortlisted.length === 0) {
        shortlistContainer.innerHTML = "<p>No candidates shortlisted yet.</p>";
    } else {
        shortlistContainer.innerHTML = shortlisted.map(candidate => `
            <div class="shortlist-entry">
                <p><strong>${candidate.name}</strong></p>
                <p><strong>Skills:</strong> ${candidate.skills}</p>
                <p><strong>Job Title:</strong> ${candidate.jobTitle}</p>
                <button onclick="removeFromShortlist('${candidate.name}')">Remove</button>
            </div>
        `).join('');
    }
}

// Remove candidate from shortlist
function removeFromShortlist(candidateName) {
    let shortlisted = JSON.parse(localStorage.getItem("shortlist")) || [];
    shortlisted = shortlisted.filter(candidate => candidate.name !== candidateName);
    localStorage.setItem("shortlist", JSON.stringify(shortlisted));
    renderShortlist();
}

// Handle Analytics Data
function renderAnalytics() {
    const analyticsContainer = document.getElementById("analyticsContainer");
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const shortlisted = JSON.parse(localStorage.getItem("shortlist")) || [];

    if (jobs.length === 0) {
        analyticsContainer.innerHTML = "<p>No job postings available.</p>";
        return;
    }

    const analyticsHTML = `
        <p><strong>Total Jobs Posted:</strong> ${jobs.length}</p>
        <p><strong>Total Candidates Shortlisted:</strong> ${shortlisted.length}</p>
        <ul>
            ${jobs.map(job => `
                <li>
                    <strong>${job.title}</strong>: 
                    ${shortlisted.filter(c => c.jobTitle === job.title).length} shortlisted candidates
                </li>
            `).join('')}
        </ul>
    `;

    analyticsContainer.innerHTML = analyticsHTML;
}

// Call render functions on respective pages
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("postedJobs")) renderPostedJobs();
    if (document.getElementById("shortlistContainer")) renderShortlist();
    if (document.getElementById("analyticsContainer")) renderAnalytics();
});
