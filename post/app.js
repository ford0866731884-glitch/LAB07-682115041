// TASK B2: Implement POST with fetch (Send Message)

// 0) Access HTML elements
const inputMessage = document.getElementById("msg");
const sendBtn = document.getElementById("btnSend");
const statusDiv = document.getElementById("status");
const resultPre = document.getElementById("output");
const clearUserBtn = document.getElementById("clearUserBtn");
clearUserBtn.addEventListener("click", clearUser);
// 1) Add click event listener
sendBtn.addEventListener("click", async () => {
  // 2) Read and trim the input value
  const message = inputMessage.value.trim();

  // 3) Validate input
  if (!message) {
    statusDiv.textContent = "Please type a message first.";
    return;
  }

  // 4) UI: show sending state + clear previous output
  statusDiv.textContent = "Sending...";
  resultPre.textContent = "";
  sendBtn.disabled = true;

  try {
    // 5) Send POST request
    const res = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        createdAt: new Date().toISOString(),
      }),
    });

    // 6) Check HTTP status
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    // 7) Parse JSON response
    const data = await res.json();

    // 8) Display echoed JSON
    resultPre.textContent = JSON.stringify(data.json, null, 2);

    // 9) Success message
    statusDiv.textContent = "Sent successfully.";
  } catch (err) {
    // 10) Error message
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    // Re-enable the button
    sendBtn.disabled = false;
  }
});
function clearUser() {
  nameEl.textContent = "";
  emailEl.textContent = "";
  avatarEl.src = "";
  userEl.style.display = "none";
  statusEl.textContent = "Cleared.";
}
