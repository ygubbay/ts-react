import axios from "axios";

const api_root = "http://localhost:9000/api/";

function projectsGetAll(customerid) {

    return axios.get(api_root + 'projects/' + customerid);    
}

function projectsGetActive(customerid) {

    return axios.get(api_root + 'projects/active/' + customerid);    
}


function todosGetByDay(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/20110404
    return axios.get(api_root + 'todos/day/' + yyyyMMdd);
}

function todosGetDailyStats(yyyyMMdd) {
    //http://localhost:9000/api/todos/day/stats/20170118
    return axios.get(api_root + 'todos/day/stats/' + yyyyMMdd);

}
function todoSave(todo) {

    return axios.post(api_root + 'todos', todo);
}

function todoDelete(tsentryid) {

    return axios.delete(api_root + 'todos/' + tsentryid);
}


export { projectsGetAll, 
        projectsGetActive, 
        todosGetByDay,
        todosGetDailyStats,
        todoSave,
        todoDelete };