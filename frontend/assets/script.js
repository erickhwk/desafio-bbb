// Load Contestants Data in the Poll
const getApiUrl = "http://localhost:3000/api/v1/contests/1"

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM completamente carregado e analisado");

  fetch(getApiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          console.log("Dados recebidos:", data);
          const participantsContainer = document.getElementById("participants");

          // Clear the container first
          participantsContainer.innerHTML = '';

          // Create the first participant
          const firstParticipantDiv = document.createElement("div");
          firstParticipantDiv.classList.add("participant");
          firstParticipantDiv.innerHTML = `
              <label>
                  <input type="radio" name="participant" value="${data.first_participant.id}">
                  <span class="option">${data.first_participant.name}</span>
              </label>
              <img src="https://i.pravatar.cc/100?img=44" alt="">
          `;
          participantsContainer.appendChild(firstParticipantDiv);

          // Create the second participant
          const secondParticipantDiv = document.createElement("div");
          secondParticipantDiv.classList.add("participant");
          secondParticipantDiv.innerHTML = `
              <label>
                  <input type="radio" name="participant" value="${data.second_participant.id}">
                  <span class="option">${data.second_participant.name}</span>
              </label>
              <img src="https://i.pravatar.cc/100?img=15" alt="">
          `;
          participantsContainer.appendChild(secondParticipantDiv);
      })
      .catch(error => console.error('Error fetching data:', error));
});

// // Captcha handling
// function onSubmit(token) {
//   document.getElementById("votingForm").submit();
// }

const postApiUrl = "http://localhost:3000/api/v1/contests/1/votes"

async function handleFormSubmit(event) {
  event.preventDefault();

  const participantId = document.getElementById("participant_id").value;

  const response = await fetch(postApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vote: {
        participant_id: participantId
      }
    })
  });

  if (response.ok) {
    alert('Vote submitted successfully!');
  } else {
    alert('Error submitting vote.');
  }
}