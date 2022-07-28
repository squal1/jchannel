import axios from "axios";

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://jchannel.herokuapp.com"
            : "http://localhost:8000",
});

instance.defaults.withCredentials = true;

export default instance;
