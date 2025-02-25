const fetchLakersButton = document.getElementById('fetch-lakers-btn');
const apiKey = '3'; // Free user API key

// Hide the modal on page load
window.onload = function() {
    document.getElementById("team-container").style.display = "none";
};

// Event listener for the button click
fetchLakersButton.addEventListener('click', function() {
    showRandomTeam();
});

// Function to show random team stats
function showRandomTeam() {
    fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/search_all_teams.php?l=NBA`)
        .then(response => response.json())
        .then(data => {
            if (data.teams && data.teams.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.teams.length);
                const team = data.teams[randomIndex];

                const container = document.getElementById('team-container');
                container.innerHTML = '';
                const teamElement = document.createElement('div');
                teamElement.classList.add('stat');
                teamElement.innerHTML = `
                    <label>Team Name:</label> ${team.strTeam}<br>
                    <label>Stadium:</label> ${team.strStadium}<br>
                    <label>Country:</label> ${team.strCountry}<br>
                    <label>Founded:</label> ${team.intFormedYear}<br>
                    <label>Coach:</label> ${team.strCoach || 'N/A'}<br>
                `;
                container.appendChild(teamElement);

                document.getElementById('team-modal').style.display = 'block';
                document.getElementById("team-container").style.display = "block"; // Show stats
            } else {
                console.log('No team data found.');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Close modal when clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('team-modal');
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("team-container").style.display = "none"; // Hide stats when closing the modal
    }
}
