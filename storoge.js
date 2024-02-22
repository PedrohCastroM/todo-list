

export function save(task) {
    let tasks = list();
    tasks.push(task);
    tasks = JSON.stringify(tasks);
    localStorage.setItem('taskList', tasks);
}

export function list(){
    let tasks= localStorage.getItem('taskList');
    if (!tasks){
        tasks =[];
    } else {
        tasks=JSON.parse(tasks);
    }
    return tasks;
}

export function remove(uuid) {
    let tasks= list();
    tasks = tasks.filter(function (item) {
        return item.uuid !== uuid;
    })
    tasks = JSON.stringify(tasks);
    localStorage.setItem('taskList', tasks);
}