browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = details.url;
    if (
      (url.startsWith('https://store.steampowered.com') ||
        url.startsWith('https://steamcommunity.com')) &&
      !isRedirected
    ) {
      isRedirected = true;
      const newUrl = 'steam://openurl/' + url;
      return { redirectUrl: newUrl };
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);

browser.webNavigation.onBeforeNavigate.addListener(function (details) {
  if (details.frameId == 0) {
    isRedirected = false;
  }
});
