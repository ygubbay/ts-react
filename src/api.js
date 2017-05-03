import axios from "axios";

const api_root = "http://localhost:9000/api/";

function projectsGetAll(customerid) {

    return axios.get(api_root + 'projects/' + customerid);    
}

function projectsGetActive(customerid) {

    return axios.get(api_root + 'projects/active/' + customerid);    
}

function getProjectTodosInMonth(userid, yyyyMM) {

    //http://localhost:9000/api/projects/todos/monthly/201701
    return axios.get(api_root + 'projects/todos/monthly/' + userid + '/' + yyyyMM);
}


function todosGetByDay(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/20110404
    return axios.get(api_root + 'todos/day/' + yyyyMMdd);
}

function todosGetDailyStats(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/stats/20170118
    return axios.get(api_root + 'todos/day/stats/' + yyyyMMdd);

}
function todosProjectMonthly(projectid, yyyyMM) {
    //http://localhost:9000/api/todos/monthly/45/201701
    return axios.get(api_root + 'todos/monthly/' + projectid + '/' + yyyyMM);
}

function todosMonthly(yyyyMM) {
    //http://localhost:9000/api/todos/monthly/201701
    return axios.get(api_root + 'todos/monthly/' + yyyyMM);
}


function todoSave(todo) {

    return axios.post(api_root + 'todos', todo);
}

function todoDelete(tsentryid) {

    return axios.delete(api_root + 'todos/' + tsentryid);
}


export { projectsGetAll, 
        projectsGetActive, 
        getProjectTodosInMonth,
        todosGetByDay,
        todosGetDailyStats,
        todoSave,
        todoDelete,
        todosProjectMonthly,
        todosMonthly };