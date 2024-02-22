import * as Storage from './storoge.js'

window.onload = function() {
renderTaskList();

}

const butonAdd = document.getElementById("add");
butonAdd.onclick = function ( ) {
    const inputTask = document.getElementById("name");
    console.log(inputTask.value);
    if (!inputTask.value){
        return;
    }
    addTask(inputTask.value);
  inputTask.value = "";
  inputTask.focus();
}

function renderTaskList(){
    const tableList = document.getElementById("list");
    tableList.innerHTML = "";
    const tasks = Storage.list();
    tasks.forEach(function(task) {
        tableList.innerHTML += `
        <tr>
            <td>${task.uuid}</td>
            <td>${task.description}</td>
            <td>
                <img
                id="task/${task.uuid}"
                width="30"
                src="./trash.png"
                 alt="trash"
                 style="cursor: pointer;"
                 />
            </td>
        </tr>
    `;
    })
    tasks.reverse().forEach(function (task) {
        const buttonDelete = document.getElementById(`task/${task.uuid}`);
        buttonDelete.onclick = function() {
            const [,uuid] = buttonDelete.id.split('/');
            deleteTask(uuid);
        }
    })
    const totalList = document.getElementById("total");
    totalList.innerHTML = `Total: ${Storage.list().length}`;
}

function addTask (value) {
    const task = {
        uuid: window.crypto.randomUUID(),
        description: value
    };
    try{
        Storage.save(task);
    } catch (error) {
        window.alert('error in save user')
    }
    Storage.save(task);
    renderTaskList();
}

function deleteTask(uuid) {
    Storage.remove(uuid);
    renderTaskList();
}