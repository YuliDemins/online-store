export function createElement(elementTag: string, elementClass: string, elementContent?: string):HTMLElement {
  const element = document.createElement(elementTag);
    element.classList.add(elementClass);
    if(elementContent) {
      element.textContent = elementContent;
    }
  return element;
}