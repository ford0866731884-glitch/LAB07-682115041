const loadUserBtn = document.getElementById("loadUserBtn");
const statusEl = document.getElementById("status");
const userEl = document.getElementById("user");
const avatarEl = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const clearUserBtn = document.getElementById("clearUserBtn");

loadUserBtn.addEventListener("click", loadUser);
clearUserBtn.addEventListener("click", clearUser);

async function loadUser() {
  // 1. Show loading status
  statusEl.textContent = "Loading…";

  // 2. Hide previous result
  avatarEl.classList.add("hidden");
  userEl.style.display = "none";

  try {
    // 3. Fetch user
    const res = await fetch("https://randomuser.me/api/");

    // 4. Check response
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    // 5. Parse JSON
    const data = await res.json();
    const user = data.results[0];

    // Render data
    nameEl.textContent = `Name: ${user.name.first} ${user.name.last}`;
    emailEl.textContent = `Email: ${user.email}`;
    avatarEl.src = user.picture.large;

    avatarEl.classList.remove("hidden");
    userEl.style.display = "block";

    

    // 6. Success status
    statusEl.textContent = "Loaded successfully.";
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
  }
}

function clearUser() {
  nameEl.textContent = "";
  emailEl.textContent = "";
  avatarEl.src = "";
  userEl.style.display = "none";
  statusEl.textContent = "Cleared.";
}
