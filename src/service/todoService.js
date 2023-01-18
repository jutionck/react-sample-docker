import {apiConfig} from "../config/apiConfig,js";

const TodoService = () => {
    const baseUrl = '/todos'
    const list = () => {
        return apiConfig().get(baseUrl);
    }

    const get = (id) => {
        return apiConfig().get(`${baseUrl}/${id}`);
    }

    const save = (todo) => {
        return apiConfig().post(baseUrl, todo);
    }

    return {
        list, get, save
    }
}

export default TodoService;