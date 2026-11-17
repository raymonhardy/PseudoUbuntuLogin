# Ubuntu-inspired sign-in demo

A small, local web demo inspired by the Ubuntu 18.04 desktop sign-in
experience. It is for UI practice and presentations, not for authenticating to
a computer.

Nothing is validated, sent, or stored. The password field accepts any text, and
pressing Enter just plays the loading animation. For debugging, the typed value
is written to the browser's DevTools console (`console.log`) — this stays on your
machine. The demo has no backend and makes no network requests.

## The flow

It is a single page (`index.html`) with three stacked layers:

1. **Lock screen** — the wallpaper with a large clock and date. Click it or
   press any key to continue.
2. **Sign-in greeter** — the lock screen lifts straight up, revealing a flat
   aubergine screen with a user tile. Choose the user to show the password
   field.
3. **Loading splash** — pressing Enter fades in the aubergine session-loading
   screen with the Ubuntu logo and pulsing dots, then returns to the lock
   screen so the demo can be replayed.

The motion respects `prefers-reduced-motion`: animations are skipped and the
states change instantly.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file
server, for example:

```sh
python3 -m http.server
```

Then visit the printed URL. (`login.html` is kept only as a redirect to
`index.html`.)

## Project layout

```
index.html        single-page demo (lock shield + greeter + splash)
login.html        redirect to index.html
css/
  base.css        resets, wallpaper, shared bars, clock, lock shield, splash
  greeter.css     the sign-in greeter (user tile + password field)
js/
  main.js         clock, shield-lift, user selection, splash
assets/
  img/            wallpaper
  icons/          top-bar status icons
```
