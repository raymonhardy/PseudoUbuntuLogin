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

const profileView = document.getElementById("profile-view");
const passwordView = document.getElementById("password-view");
const desktopView = document.getElementById("desktop-view");
const selectDemoUserButton = document.getElementById("select-demo-user");
const openDemoButton = document.getElementById("open-demo");
const returnToProfileButton = document.getElementById("return-to-profile");
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

if (profileView && passwordView && selectDemoUserButton) {
  selectDemoUserButton.addEventListener("click", () => {
    profileView.hidden = true;
    passwordView.hidden = false;
    selectDemoUserButton.setAttribute("aria-expanded", "true");
    passwordView.querySelector("h1").focus();
  });
}

if (profileView && passwordView && desktopView && openDemoButton && returnToProfileButton) {
  openDemoButton.addEventListener("click", () => {
    passwordView.hidden = true;
    desktopView.hidden = false;
    desktopView.querySelector("h1").focus();
  });

  returnToProfileButton.addEventListener("click", () => {
    desktopView.hidden = true;
    profileView.hidden = false;
    passwordView.hidden = true;
    selectDemoUserButton?.focus();
  });
}
