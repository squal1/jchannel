import React, { useEffect, useState } from "react";
import "./ThreadList.css";
import ThreadBlock from "./ThreadBlock";
import axios from "./axios";
import { useParams } from "react-router-dom";

function ThreadList() {
    const { category } = useParams();
    const [threads, setThreads] = useState([]);

    // Load threads after selected a category
    useEffect(() => {
        if (typeof category !== "undefined") {
            axios.get(`/thread/${category}`).then((response) => {
                setThreads(response.data);
            });
        }
    }, [category]);

    return (
        <div className="thread_bar">
            {threads.map((item, index) => {
                return <ThreadBlock thread={item} />;
            })}
        </div>
    );
}

export default ThreadList;
