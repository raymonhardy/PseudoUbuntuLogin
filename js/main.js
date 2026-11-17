const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

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
    topTime.textContent = new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      hourCycle: "h23",
      minute: "2-digit",
    }).format(now);
  }
}

updateClock();
window.setInterval(updateClock, 1000);

// Lift the lock shield straight up to reveal the greeter underneath,
// the way GDM's shield behaves on Ubuntu 18.04.
const shield = document.getElementById("lock-shield");
const greeter = document.querySelector(".greeter");
const userSelect = document.getElementById("user-select");
const userTile = document.getElementById("user-tile");
const passwordView = document.getElementById("password-view");
const passwordInput = document.getElementById("password-input");

function unlock() {
  if (!document.body.classList.contains("locked")) return;

  document.body.classList.remove("locked");
  document.body.classList.add("unlocked");
  if (shield) shield.setAttribute("aria-hidden", "true");
  if (greeter) greeter.setAttribute("aria-hidden", "false");

  const focusTile = () => userTile && userTile.focus();
  if (prefersReducedMotion.matches || !shield) {
    focusTile();
  } else {
    shield.addEventListener("transitionend", focusTile, { once: true });
  }
}

if (shield) {
  shield.addEventListener("click", unlock);
  shield.addEventListener("keydown", (event) => {
    // Any key dismisses the shield, as in GDM. Ignore lone modifiers.
    if (["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
    event.preventDefault();
    unlock();
  });
}

// Choosing the user reveals the password field, as in GDM's greeter.
function chooseUser() {
  if (userSelect) userSelect.hidden = true;
  if (passwordView) passwordView.hidden = false;
  if (userTile) userTile.setAttribute("aria-expanded", "true");
  if (passwordInput) passwordInput.focus();
}

if (userTile) {
  userTile.addEventListener("click", chooseUser);
}

// Submitting the password shows the aubergine session-loading splash,
// then returns to the lock screen so the demo can be replayed.
const sessionSplash = document.getElementById("session-splash");

function resetToLock() {
  if (sessionSplash) {
    sessionSplash.classList.remove("is-visible");
    sessionSplash.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("unlocked");
  document.body.classList.add("locked");
  if (shield) shield.setAttribute("aria-hidden", "false");
  if (greeter) greeter.setAttribute("aria-hidden", "true");
  if (passwordInput) {
    passwordInput.value = "";
    passwordInput.blur();
  }
  // Return to the user list so the next unlock starts fresh.
  if (passwordView) passwordView.hidden = true;
  if (userSelect) userSelect.hidden = false;
  if (userTile) userTile.setAttribute("aria-expanded", "false");
}

function submitPassword() {
  if (!sessionSplash || sessionSplash.classList.contains("is-visible")) return;
  sessionSplash.setAttribute("aria-hidden", "false");
  sessionSplash.classList.add("is-visible");
  window.setTimeout(resetToLock, 2600);
}

if (passwordInput) {
  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Password entered:", passwordInput.value);
      submitPassword();
    }
  });
}
