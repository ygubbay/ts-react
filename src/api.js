import axios from "axios";

const api_root = "http://localhost:9000/api/";

function projectsGetAll() {

    return axios.get(api_root + 'projects');    
}


export { projectsGetAll };