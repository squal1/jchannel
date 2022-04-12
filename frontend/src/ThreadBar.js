import React, { useEffect, useState } from "react";
import "./ThreadBar.css";
import ThreadBlock from "./ThreadBlock";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";

function ThreadBar() {
    const category = useSelector((state) => state.changeCategory);
    const [threads, setThreads] = useState([]);

    // Load threads of a category
    useEffect(() => {
        axios.get(`/thread/category/${category.category}`).then((response) => {
            setThreads(response.data);
        });
    }, [category.category, setThreads]);

    return (
        <div className="thread_bar">
            {threads.map((item, index) => {
                return (
                    <ThreadBlock
                        author={item.author.username}
                        title={item.title}
                        score={item.upVote - item.downVote}
                        id={item._id}
                        time={item.lastReplied}
                    />
                );
            })}
        </div>
    );
}

export default ThreadBar;
