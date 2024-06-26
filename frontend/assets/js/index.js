const baseUrl = (window.location.hostname === 'localhost') ? 'http://localhost:3000' : 'https://api.example.com';

document.addEventListener("DOMContentLoaded", function() {  
  const contestUrl = `${baseUrl}/api/v1/contest/active`;

  fetch(contestUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText)
          }
          return response.json()
      })
      .then(data => {
        const participantsContainer = document.getElementById("participants");

        participantsContainer.innerHTML = '';

        const createParticipantDiv = (participant) => {
          const participantDiv = document.createElement("div");
          participantDiv.classList.add("participant");
          participantDiv.innerHTML = `
            <label>
              <input type="radio" name="participant" value="${participant.id}">
              <span class="option">${participant.name}</span>
            </label>
            <img src="../assets/img/male-placeholder.jpeg" alt="">
          `;
          return participantDiv;
        }

        const firstParticipantDiv = createParticipantDiv(data.first_participant);
        participantsContainer.appendChild(firstParticipantDiv);

        const secondParticipantDiv = createParticipantDiv(data.second_participant);
        participantsContainer.appendChild(secondParticipantDiv);

      })
      .catch(error => console.error('Error fetching data:', error))
});

document.addEventListener('DOMContentLoaded', function () {
  function onSubmit(token) {
    const selectedParticipant = document.querySelector('input[name="participant"]:checked');
    if (selectedParticipant) {

      const data = {
        vote: {
          participant_id: selectedParticipant.value
        },
        recaptcha_token: token
      };
      
      const voteUrl = `${baseUrl}/api/v1/contest/active/vote`;

      fetch(voteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText)
        }
        return response.json()
      })
      .then(responseData => {
        console.log("Response from the server:", responseData)
        window.location.href = "success.html"
      })
      .catch(error => console.error('Error posting data:', error))
    } else {
      console.log("No participant selected")
    }
  }

  window.onSubmit = onSubmit
});