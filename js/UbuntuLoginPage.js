function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
  }).format(now);
  const date = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  const clock = document.getElementById("clock");
  const dateLine = document.getElementById("date");
  const topTime = document.getElementById("top-time");

  if (clock) clock.textContent = time;
  if (dateLine) dateLine.textContent = date;
  if (topTime) {
    topTime.textContent = document.body.classList.contains("credential-screen")
      ? new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          hourCycle: "h23",
          minute: "2-digit",
        }).format(now)
      : time;
  }
}

updateClock();
window.setInterval(updateClock, 1000);

const screenContinueLink = document.querySelector(".screen-continue");

if (screenContinueLink) {
  screenContinueLink.addEventListener("click", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.assign(screenContinueLink.href);
    }, 360);
  });

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
  });
}

const inputField = document.getElementById("password-input");

inputField.addEventListener("keydown", function(event) {
  // Check if the pressed key is "Enter"
  if (event.key === "Enter") {
    // Prevent the default form submission behavior if necessary
    event.preventDefault(); 
    
    // Run your code here
    console.log("Enter key pressed! Value:", event.target.value);
  }
});
