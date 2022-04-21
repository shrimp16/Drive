import * as config from './config.js';

export function updateStorageInfo(id) {
    let storageBar = document.getElementById('storage-bar');
    let storageInfo = document.getElementById('storage-info');

    fetch(`${config.ADDRESS}/space/${id}`)
    .then(response => response.json())
    .then((response) => {
        storageBar.style.width = `${Math.floor((response.usedStorage / response.storage) * 100)}%`;
        storageInfo.innerText = `${(response.usedStorage).toFixed(2)} GB / ${(response.storage).toFixed(2)} GB`;
    })
}