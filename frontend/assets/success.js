document.addEventListener('DOMContentLoaded', function () {
  const voteSummaryApiUrl = 'http://localhost:3000/api/v1/contests/1/votes_summary';

  fetch(voteSummaryApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const votesPartialContainer = document.getElementById('votes-partial');
      votesPartialContainer.innerHTML = '';

      // Função para calcular a porcentagem de votos
      function votesPercentage(participant_votes, total_votes) {
        const participant_vote_percentage = (participant_votes / total_votes) * 100;
        return participant_vote_percentage.toFixed(2);
      }

      // Criar e adicionar os participantes
      Object.keys(data.participants).forEach(participantKey => {
        const participant = data.participants[participantKey];
        
        const participantPartialDiv = document.createElement('div');
        participantPartialDiv.classList.add('participant-partial');

        participantPartialDiv.innerHTML = `
          <p class="option">${participant.name}</p>
          <p class="option">${votesPercentage(participant.votes, data.total_votes)}%</p>
        `;

        votesPartialContainer.appendChild(participantPartialDiv);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
