document.getElementById("user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify({ user: username }),
    headers: { "Content-Type": "application/json" }
  }).then((response) => (window.location.href = response.url));
});
