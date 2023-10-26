export function waitForElement(selector: string): Promise<Element> {
  return new Promise(resolve => {
    const findElement = document.querySelector(selector)

    if (findElement) {
      return resolve(findElement);
    }

    const observer = new MutationObserver(mutations => {
      const findElement = document.querySelector(selector)

      if (findElement) {
        observer.disconnect();
        resolve(findElement);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
