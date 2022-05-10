import "./ThreadList.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";
import ThreadBlock from "./ThreadBlock";
import { refreshThreadStart, refreshThreadEnd, setThread } from "./actions";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

function ThreadList() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const currentThreads = useSelector((state) => state.threads);
    const isRefreshing = useSelector((state) => state.refreshThread);
    const currentCategory = useSelector(
        (state) => state.selectCategory.category
    );

    const getThread = (category) => {
        axios.get(`/thread/${category}`).then((response) => {
            setTimeout(() => {
                dispatch(setThread(response.data));
                dispatch(refreshThreadEnd());
            }, 500);
        });
    };

    // Load threads after selected a category
    useEffect(() => {
        if (typeof category !== "undefined") {
            dispatch(refreshThreadStart());
            getThread(category);
        }
    }, [category]);

    // Refresh thread list
    useEffect(() => {
        if (isRefreshing === true) {
            // Scroll to top when refresh
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
            {currentThreads.map((item, index) => {
                return <ThreadBlock thread={item} key={item._id} />;
            })}
        </div>
    );
}

export default ThreadList;
