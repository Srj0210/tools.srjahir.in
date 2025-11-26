(function () {
  const GA_ID = "G-WVVRTYJHCS";

  // Load GA4 Script Dynamically
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  // Initialize GA dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());

  // Config
  gtag("config", GA_ID, {
    page_title: document.title,
    page_path: window.location.pathname,
  });

})();