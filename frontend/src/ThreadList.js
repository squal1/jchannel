import React, { useEffect, useState } from "react";
import "./ThreadList.css";
import ThreadBlock from "./ThreadBlock";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";

function ThreadList() {
    const category = useSelector((state) => state.changeCategory);
    const [threads, setThreads] = useState([]);

    // Load threads of a category
    useEffect(() => {
        axios.get(`/thread/category/${category.category}`).then((response) => {
            setThreads(response.data);
        });
    }, [category.category]);

    return (
        <div className="thread_bar">
            {threads.map((item, index) => {
                return <ThreadBlock thread={item} />;
            })}
        </div>
    );
}

export default ThreadList;
