import "./ThreadList.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";
import ThreadBlock from "./ThreadBlock";
import { refreshThreadEnd } from "./actions";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

function ThreadList() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const [threads, setThreads] = useState([]);
    const isRefreshing = useSelector((state) => state.refreshThread);
    const currentCategory = useSelector(
        (state) => state.selectCategory.category
    );

    const getThread = (category) => {
        axios.get(`/thread/${category}`).then((response) => {
            setTimeout(() => {
                setThreads(response.data);
                dispatch(refreshThreadEnd());
            }, 300);
        });
    };

    // Load threads after selected a category
    useEffect(() => {
        if (typeof category !== "undefined") {
            getThread(category);
        }
    }, [category]);

    // Refresh thread list
    useEffect(() => {
        if (isRefreshing === true) {
            document.getElementById("thread_scroller").scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            getThread(currentCategory);
        }
    }, [isRefreshing]);

    return (
        <div className="thread_list" id="thread_scroller">
            <div
                className="thread_list_reload_block"
                style={{
                    height: isRefreshing ? 50 : 0,
                    transition: "0.1s",
                }}
            >
                <RefreshIcon className="thread_list_refresh_icon" />
            </div>
            {threads.map((item, index) => {
                return <ThreadBlock thread={item} />;
            })}
        </div>
    );
}

export default ThreadList;
