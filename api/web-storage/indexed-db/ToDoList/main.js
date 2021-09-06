const todo_ul = document.querySelector('.todo_ul');
const task_input = document.querySelector('.task_input')
const add_btn = document.querySelector('.add_btn');
const form = document.querySelector('form');

let db;

// indexedDB
if(!window.indexedDB) {
    alert('Browser doesnt support IndexedDB');
} else {
    window.onload = function() {
        // open( DB_Name , DB_Version )
        let request = window.indexedDB.open('ToDo_db', 2);

        //DB가 아직 설정되지 않았거나, 기존 저장된 DB보다 큰 버전 번호로 열린 경우(업그레이드 수행 시) 실행
        request.onupgradeneeded = function(evt) {
            // 새로운 버전의 DB
            let db = evt.target.result;

            // Table 생성
            let objectStore = db.createObjectStore('todo_os', { keyPath: 'id', autoIncrement: true});

            // field 생성
            objectStore.createIndex('taks', 'task', {unique: false});

            console.log('DB Setup complete');
        }

        request.onerror = function() {
            console.log('Failed to open DB');
        }

        request.onsuccess = function() {
            db = request.result;
            console.log('Success to Open DB');

            displayData();
        }

        form.onsubmit = addData;
    }
}

function addData(evt) {
    evt.preventDefault();

    let newTask = { task : task_input.value };

    let transaction = db.transaction(['todo_os'], 'readwrite');

    let objectStore = transaction.objectStore('todo_os');

    let request = objectStore.add(newTask);

    request.onsuccess = function() {
        task_input.value = '';
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
    while(todo_ul.firstChild) {
        todo_ul.removeChild(todo_ul.firstChild);
    }

    let objectStore = db.transaction('todo_os').objectStore('todo_os');

    objectStore.openCursor().onsuccess = function(evt) {
        let cursor = evt.target.result;
        if(cursor) {
            let li = document.createElement('li');
            let chk_box = document.createElement('input');
            let new_task = document.createElement('span');
            let del_btn = document.createElement('button');
            let edit_btn = document.createElement('button');
            let edit_input = document.createElement('input');

            li.appendChild(chk_box);
            li.appendChild(new_task);
            li.appendChild(del_btn);
            li.appendChild(edit_input);
            li.appendChild(edit_btn);

            todo_ul.appendChild(li);

            chk_box.setAttribute('type', 'checkbox');
            li.setAttribute('task-id', cursor.value.id);
            new_task.setAttribute('class', 'new_task');
            new_task.textContent = cursor.value.task;
            
            del_btn.textContent = 'Delete';
            edit_btn.textContent = 'Edit';

            del_btn.onclick = deleteData;

            // Iterate to the next item in the cursor
            cursor.continue();
        } else {
            if(!todo_ul.firstChild) {
                const li = document.createElement('li');
                todo_ul.appendChild(li);
                li.textContent('No Item');
            }

            console.log('Task all Displayed');
        }
    }
}

// id를 통해 db에서 삭제
function deleteData(evt) {
    // DB에서 삭제
    // 속성값이 String type이므로 Number로 바꿔줘야 id로 삭제 가능
    let taskId = Number(evt.target.parentNode.getAttribute('task-id'));

    let transaction = db.transaction(['todo_os'], 'readwrite');
    let objectStore = transaction.objectStore('todo_os');

    let request = objectStore.delete(taskId);

    // DOM에서 삭제
    transaction.oncomplete = function() {
        evt.target.parentNode.parentNode.removeChild(evt.target.parentNode);
        console.log('Successfully Deleted');

        if(!todo_ul.firstChild) {
            let li = document.createElement('li');
            li.textContent = 'No Tasks stored.';
            todo_ul.appendChild(li);
        }
    }
}

