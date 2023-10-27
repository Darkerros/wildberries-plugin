export async function waitForHrefChange () {
  return new Promise(resolve => {
    let previousUrl = window.location.href;

    const observer = new MutationObserver(() => {
      if (window.location.href !== previousUrl) {
        console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
        previousUrl = window.location.href;
        resolve('')
      }
    });
    const config = { subtree: true, childList: true };

    observer.observe(document, config);
  })

}


