const userOptions = `<div class="options" id="options">
            <button class="buttons" id="upload">Upload Files</button>
            <button class="buttons" id="files">My Files</button>
            <button class="buttons" id="logout">Log out</button>
            <div class="storage-container">
                <div class="storage-bar" id="storage-bar"></div>
                <p id="storage-info">0/5GB</p>
            </div>
        </div>`

export function getUserOptions() {
    return userOptions;
}