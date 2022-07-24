import "./ThreadList.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import ThreadListItem from "./ThreadListItem";
import { refreshThreadStart, refreshThreadEnd, setThread } from "../actions";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

function ThreadList() {
    const dispatch = useDispatch();
    const { category, userId } = useParams();
    const [skip, setSkip] = useState(0);
    const currentThreads = useSelector((state) => state.threads.list);
    const isRefreshing = useSelector((state) => state.refreshThread);
    const currentCategory = useSelector(
        (state) => state.selectCategory.category
    );

    // Load threads after selected a category
    useEffect(() => {
        if (typeof category === "undefined") {
            return;
        }
        dispatch(refreshThreadStart());
        axios.get(`/thread/category/${category}?skip=${0}`).then((response) => {
            setTimeout(() => {
                dispatch(setThread(response.data));
                dispatch(refreshThreadEnd());
            }, 500);
        });
    }, [category]);

    // Find threads of a user
    useEffect(() => {
        if (typeof userId === "undefined") {
            return;
        }
        dispatch(refreshThreadStart());
        axios.get(`/user/profile/?userId=${userId}`).then((response) => {
            setTimeout(() => {
                dispatch(setThread(response.data));
                dispatch(refreshThreadEnd());
            }, 500);
        });
    }, [userId]);

    // Infinite scroll
    useEffect(() => {
        axios
            .get(`/thread/category/${currentCategory}?skip=${skip}`)
            .then((response) => {
                // Append the new threads to the threads list
                dispatch(setThread([...currentThreads, ...response.data]));
            });
    }, [skip]);

    // Refresh thread list
    useEffect(() => {
        if (isRefreshing === false) {
            return;
        }

        if (typeof category === "undefined") {
            return;
        }

        // Scroll to top when refresh
        document.getElementById("thread_scroller").scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        // Reset thread list
        axios
            .get(`/thread/category/${currentCategory}?skip=${0}`)
            .then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 500);
            });
    }, [isRefreshing]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;
        console.log(
            `offsetHeight: ${offsetHeight} scrollTop: ${scrollTop} scrollHeight: ${scrollHeight}`
        );
        if (offsetHeight + scrollTop + 1 >= scrollHeight) {
            if (typeof category === "undefined") {
                return;
            }
            setSkip(currentThreads.length);
        }
    };

    return (
        <div
            className="thread_list"
            id="thread_scroller"
            onScroll={handleScroll}
        >
            <div
                className="thread_list_reload_block"
                style={{
                    height: isRefreshing ? 60 : 0,
                    transition: "0.1s",
                }}
            >
                <RefreshIcon
                    className="thread_list_refresh_icon"
                    style={{
                        height: isRefreshing ? "100%" : 0,
                        transition: "0.1s",
                    }}
                />
            </div>
            {currentThreads.map((item, index) => {
                return <ThreadListItem thread={item} key={item._id} />;
            })}
        </div>
    );
}

export default ThreadList;
