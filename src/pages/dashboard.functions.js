import { storage } from '@core/utils';

function toHTML(key) {
  const model = storage(key);
  const numberKey = key.slice(6);
  return `
     <li class="db__record">
      <a href=#excel/${numberKey}>${model.appTitle}</a>
      <strong>
        ${new Date(model.date).toLocaleDateString()}
        ${new Date(model.date).toLocaleTimeString()}
      </strong>
     </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    } else {
      keys.push(key);
    }
  }
  return keys;
}
export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>У вас нет таблиц</p>`;
  }
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
     </div>
     <ul class="db__list">
        ${keys.map(toHTML).join('')}
     </ul>
  `;
}