window.addEventListener("load", function () {
  const GA_ID = "G-KCPFP9R997";
  setTimeout(function () {
    var s = document.createElement("script");
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { send_page_view: false });
    gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, 3500);
});

document.addEventListener("htmx:afterSettle", function () {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
});
