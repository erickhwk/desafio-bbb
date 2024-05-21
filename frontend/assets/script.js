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
          const participantsContainer = document.getElementById("participants")

          // Clear the container first
          participantsContainer.innerHTML = ''

          // Create the first participant
          const firstParticipantDiv = document.createElement("div")
          firstParticipantDiv.classList.add("participant")
          firstParticipantDiv.innerHTML = `
              <label>
                  <input type="radio" name="participant" value="${data.first_participant.id}">
                  <span class="option">${data.first_participant.name}</span>
              </label>
              <img src="https://i.pravatar.cc/100?img=44" alt="">
          `;
          participantsContainer.appendChild(firstParticipantDiv)

          // Create the second participant
          const secondParticipantDiv = document.createElement("div")
          secondParticipantDiv.classList.add("participant")
          secondParticipantDiv.innerHTML = `
              <label>
                  <input type="radio" name="participant" value="${data.second_participant.id}">
                  <span class="option">${data.second_participant.name}</span>
              </label>
              <img src="https://i.pravatar.cc/100?img=15" alt="">
          `;
          participantsContainer.appendChild(secondParticipantDiv)
      })
      .catch(error => console.error('Error fetching data:', error))
});

document.addEventListener('DOMContentLoaded', function () {
  function onSubmit(token) {
    const form = document.getElementById("votingForm");

    // Get the selected participant ID
    const selectedParticipant = document.querySelector('input[name="participant"]:checked');
    if (selectedParticipant) {
      console.log("Selected participant ID:", selectedParticipant.value);

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
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(responseData => {
        console.log("Response from the server:", responseData);
        // LIDAR COM O REDIRECT AQUI
      })
      .catch(error => console.error('Error posting data:', error));
    } else {
      console.log("No participant selected");
    }
  }

  window.onSubmit = onSubmit;
});