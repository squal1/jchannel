import axios from "axios";

const port = process.env.PORT || "8000";

const instance = axios.create({
    baseURL: process.env.baseURL + port || "http://localhost:8000",
});

instance.defaults.withCredentials = true;

console.log("PORT:", process.env.baseURL + port);

export default instance;
