interface MyWindow extends Window {
  dataLayer: IArguments[];
  gtag: (...args: unknown[]) => void;
}

const getWin = () => globalThis as unknown as MyWindow;

let lastPath = "";
let lastTitle = "";
let initialized = false;

const sendPageView = (win: MyWindow) => {
  const currentPath = window.location.pathname;
  const currentTitle = document.title;

  if (currentPath === lastPath && currentTitle === lastTitle) return;

  lastPath = currentPath;
  lastTitle = currentTitle;

  if (typeof win.gtag === "function") {
    win.gtag("event", "page_view", {
      page_title: currentTitle,
      page_location: window.location.href,
      page_path: currentPath,
    });
  }
};

const initGa = () => {
  if (initialized) return;
  initialized = true;

  const GA_ID = "G-KCPFP9R997";
  const win = getWin();

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
  win.dataLayer = win.dataLayer || [];

  // Need a regular function (not arrow) to access arguments
  function gtag() {
    // biome-ignore lint/complexity/noArguments: gtag requires the arguments object
    getWin().dataLayer.push(arguments);
  }

  win.gtag = gtag;
  win.gtag("js", new Date());
  win.gtag("config", GA_ID);
  sendPageView(win);

  // Remove listeners after initialization
  interactionEvents.forEach((e) => {
    window.removeEventListener(e, initGa);
  });
};

const interactionEvents = ["mouseover", "keydown", "touchmove", "touchstart", "scroll"];

// Initialize only on interaction to save main thread during load
interactionEvents.forEach((e) => {
  window.addEventListener(e, initGa, { once: true, passive: true });
});

document.addEventListener("htmx:afterSettle", () => {
  if (initialized) {
    sendPageView(getWin());
  }
});
