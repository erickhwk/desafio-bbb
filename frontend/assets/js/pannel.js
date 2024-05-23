const baseUrl = (window.location.hostname === 'localhost') ? 'http://localhost:3000' : 'https://api.example.com';

document.addEventListener('DOMContentLoaded', function () {
  const voteSummaryApiUrl = `${baseUrl}/api/v1/contest/active/votes`;

  fetch(voteSummaryApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const votesPartialContainer = document.getElementById('participants-summary');
      votesPartialContainer.innerHTML = '';

      function votesPercentage(participant_votes, total_votes) {
        const participant_vote_percentage = (total_votes === 0) ? 0 : (participant_votes / total_votes) * 100;
        return participant_vote_percentage.toFixed(2);
      }

      Object.keys(data.participants).forEach(participantKey => {
        const participant = data.participants[participantKey];
        
        const participantPartialDiv = document.createElement('div');
        participantPartialDiv.classList.add('vote-summary');

        participantPartialDiv.innerHTML = `
            <div class="participant-name">${participant.name}</div>
            <div class="percentage">${votesPercentage(participant.votes, data.total_votes)}%</div>
            <div class="total-votes">
              <span>Total:</span><span>${participant.votes}</span>
            </div>
        `;

        votesPartialContainer.appendChild(participantPartialDiv);
      });

      const totalVotesContainer = document.getElementById('total-summary');
      totalVotesContainer.innerHTML = '';

      const totalVotesPartialDiv = document.createElement('div');
      totalVotesPartialDiv.classList.add('vote-summary');

      totalVotesPartialDiv.innerHTML = `
        <div class="participant-name">Votação Total</div>
        <div class="percentage">${data.total_votes}</div>
        <div class="last-hour-votes">
          <span>Votos na última hora:</span><span>${data.votes_in_last_hour}</span>
        </div>
      `;

      totalVotesContainer.appendChild(totalVotesPartialDiv);

    })
    .catch(error => console.error('Error fetching data:', error));
});
