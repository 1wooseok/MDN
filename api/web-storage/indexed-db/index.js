// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
let db;
const videos = [
    { 'name' : 'crystal' },
    { 'name' : 'elf' },
    { 'name' : 'flog' },
    { 'name' : 'monster' },
    { 'name' : 'pig' },
    { 'name' : 'rabbit' }
]

// Asyncronous
window.onload = function() {
    let request = window.indexedDB.open('notes_db', 1);

    // Handling Error
    request.onerrer = function() {
        console.log('Database failed to open.');
    }

    // Success
    request.onsuccess = function() {
        console.log('Database opened successfully.');

        db = request.result;
        displayData();
    }

    // If need upgrade DB
    request.onupgradeneeded = function(evt) {
        let db = evt.target.result;
        console.log(db);
        let objectStore = db.createObjectStore('notes_os', {keyPath : 'id', autoIncrement : true});

        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });

        console.log('Database setup complete');
    }
    
    form.onsubmit = addData;
}

function addData(evt) {
    evt.preventDefault();

    
    let newItem = { title: titleInput.nodeValue, body: bodyInput.value };
    // db -> undefined
    let transaction = db.transaction(['notes_os'], 'readwrite');
    let objectStore = transaction.objectStore('notes_os');

    let request = objectStore.add(newItem);
    request.onsuccess = function() {
        titleInput.value = '';
        bodyInput.value = '';
    }

    transaction.oncomplete = function() {
        console.log('Transaction completed: database modification finished.');
        displayData();
    }

    transaction.onerror = function() {
        console.log('Transaction not opened due to error');
    };
}

function displayData() {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

    let objectStore = db.transaction('notes_os').objectStore('notes_os');

    objectStore.openCursor().onsuccess = function(evt) {
        let cursor = evt.target.result;

        console.log(cursor);

        if(cursor) {
            let li = document.createElement('li');
            let h3 = document.createElement('h3');
            let para = document.createElement('para');

            li.appendChild(h3);
            li.appendChild(para);
            list.appendChild(li);

            h3.textContent = cursor.value.title;
            para.textContent = cursor.value.body;

            li.setAttribute('data-note-id', cursor.value.id);

            // Create Delete Button
            let deleteBtn = document.createElement('button');
            li.appendChild(deleteBtn);
            deleteBtn.textContent = 'Delete';

            deleteBtn.onclick = deleteItem;

            cursor.continue();
        } else {
            if(!list.firstChild) {
                let li = document.createElement('li');
                li.textContent = 'No notes stored.';
                list.appendChild(li);
            }
            console.log('Notes all displayed');
        }
    }
}

function deleteItem(evt) {
    // li 
    let noteId = Number(evt.target.parentNode.getAttribute('data-node-id'));

    let transaction = db.transaction(['notes_os'], 'readwrite');
    let objectStore = transaction.objectStore('notes_os');
    let request = objectStore.delete(noteId);

    transaction.oncomplete = function() {
        evt.target.parentNode.parentNode.removeChild(evt.target.parentNode);
        console.log(`Note ${noteId} deleted`);

        if(!list.firstChild) {
            let listItem = document.createElement('li');
            listItem.textContent = 'No Notes Item.'
            list.appendChild(listItem);
        }
    }
}

// load Video Data
function init() {
    for (let i=0; i<videos.length; i++) {
        let objectStore = db.transaction('videos_os').objectStore('videos_os');
        let request = objectStore.get(videos[i].name);

        request.onsuccess = function() {
            if(request.result) {
                console.log('Taking video from IDB');
                displayVideo(request.result.mp4, request.result.webm, request.result.name);
            } else {
                fetchVideoFromNetwork(videos[i]);
            }
        }

        let mp4Blob = fetch(`videos/${videos.name}.mp4`).then(response => response.blob());
        let webmBlob = fetch(`videos/${videos.name}.webm`).then(response => response.blob());

        Promise.all([[mp4Blob, webmBlob]]).then(function(values) {
            console.log(`This is vlaues --- ${values}`);
            displayVieo(values[0], vlaues[1], video.name);
            storeVideo(values[0], vlaues[1], video.name);
        })
    }
}

function storeVideo(mp4Blob, webmBlob, name) {
    let objectStore = db.transaction('videos_os').objectStore('videos_os');
    let lecord = {
        mp4 : mp4Blob,
        webm : webmBlob,
        name : name
    }
    let requset = objectStore.add(record);
}

function displayVideo(mp4Blob, webmBlob, title) {
    let mp4Url = URL.createObjectURL(mp4Blob);
    let webmUrl = URL.createObjectURL(webmBlob);
    
    let video = document.createElement('video');
    video.controls = true;

    let source1 = document.createElement('source');
    source1.src = mp4URL;
    source1.type = 'video/mp4';
    let source2 = document.createElement('source');
    source2.src = webmURL;
    source2.type = 'video/webm';
}
