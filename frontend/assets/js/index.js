// Load Contestants Data in the Poll
const getApiUrl = "http://localhost:3000/api/v1/contests/1"

document.addEventListener("DOMContentLoaded", function() {

  fetch(getApiUrl)
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
            <img src="https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg" alt="">
          `;
          return participantDiv;
        }

        // Create the first participant
        const firstParticipantDiv = createParticipantDiv(data.first_participant);
        participantsContainer.appendChild(firstParticipantDiv);

        // Create the second participant
        const secondParticipantDiv = createParticipantDiv(data.second_participant);
        participantsContainer.appendChild(secondParticipantDiv);

      })
      .catch(error => console.error('Error fetching data:', error))
});

document.addEventListener('DOMContentLoaded', function () {
  function onSubmit(token) {
    const form = document.getElementById("votingForm");

    // Get the selected participant ID
    const selectedParticipant = document.querySelector('input[name="participant"]:checked');
    if (selectedParticipant) {

      // Prepare the data to be sent in the POST request
      const data = {
        vote: {
          participant_id: selectedParticipant.value
        },
        recaptcha_token: token
      };

      // Send the POST request
      fetch("http://localhost:3000/api/v1/contests/1/votes", {
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