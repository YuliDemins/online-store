export function createElement(elementTag: string, elementClass: string, elementContent?: string):HTMLElement {
  const element = document.createElement(elementTag);
  element.classList.add(elementClass);
  if (elementContent) {
    element.textContent = elementContent;
  }
  return element;
}

export function addFilters(filters:string[]) {
  filters.map((item) => {
    const filterCategoryForm = createElement('label', 'filter-category-form', item);
    const filterCategoryInput = createElement('input', 'filter-category-input');
    filterCategoryInput.setAttribute('type', 'checkbox');
    filterCategoryInput.setAttribute('name', 'category');
    filterCategoryInput.setAttribute('value', item);
    const filterCategorySpan = createElement('span', 'filter-category-span');
    filterCategoryForm.append(filterCategoryInput, filterCategorySpan);
    return item;
  });
}
