function onSubmit(token) {
  document.getElementById("votingForm").submit();
}

const apiUrl = "http://localhost:3000/api/v1/contests/1"

fetch(apiUrl)
      .then(response => response.json())
      .then(json => console.log(json))