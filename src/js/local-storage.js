function getLocalStorageData() {
  const data = localStorage.getItem('data');
  const parsedData = JSON.parse(data);

  return parsedData;
}

function getClientEvents() {
  return JSON.parse(localStorage.getItem('clientEvents') || '[]');
}

function addToLocalStorage(event) {
  const all = getClientEvents();
  all.push(event);

  localStorage.setItem('clientEvents', JSON.stringify(all));
}

function removeFromLocalStorage(event) {
  const all = getClientEvents();
  const newAll = all.filter(item => item.dataId !== event);

  localStorage.setItem('clientEvents', JSON.stringify(newAll));
}

export {
  getLocalStorageData,
  getClientEvents,
  addToLocalStorage,
  removeFromLocalStorage,
};