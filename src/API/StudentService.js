import axios from "axios";

export default class StudentService {
    static async getAll() {
        const response = await axios.get('http://localhost:8080/students/')
        return response
    }

    static async deleteById(id) {
        let bodyFormData = new FormData();
        bodyFormData.append('id',id)
        return axios({
            method: "post",
            url: "http://localhost:8080/students/delete",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
    }

}
