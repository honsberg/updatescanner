import {qs, $on, $delegate, findParentWithClass} from 'util/view_helpers';

/**
 * @param {Function} handler - Called when the ShowAll button is clicked.
 */
export function bindShowAllClick(handler) {
  $on(qs('#showAll'), 'click', handler);
}

/**
 * @param {Function} handler - Called when the New button is clicked.
 */
export function bindNewClick(handler) {
  $on(qs('#new'), 'click', handler);
}

/**
 * @param {Function} handler - Called when the Sidebar button is clicked.
 */
export function bindSidebarClick(handler) {
  $on(qs('#sidebar'), 'click', handler);
}

/**
 * @param {Function} handler - Called when a Page list item is clicked.
 */
export function bindPageClick(handler) {
  // Match all elements that have .panel-list-item as a parent
  $delegate(qs('#list'), '.panel-list-item *', 'click', ({target}) => {
    // Search upwards to find .panel-list-item
    const item = findParentWithClass(target, 'panel-list-item');
    handler(item.dataset.id);
  });
}

/**
 * Add a page to the list of updated pages.
 *
 * @param {Page} page - Page to add.
 */
export function addPage(page) {
  qs('#list').appendChild(createListItem(page));
}


/**
 * Create a new list item for a Page.
 *
 * @param {Page} page - Page object to use for the list item.
 *
 * @returns {Element} List item for the given Page.
 */
function createListItem(page) {
  const item = document.createElement('div');
  item.className = 'panel-list-item';
  item.dataset.id = page.id;

  const icon = document.createElement('div');
  icon.className = 'icon';
  const image = document.createElement('img');
  image.src = '/images/updatescanner_18.png';
  icon.appendChild(image);

  const text = document.createElement('div');
  text.className = 'text';
  text.textContent = page.title;

  item.appendChild(icon);
  item.appendChild(text);
  return item;
}
