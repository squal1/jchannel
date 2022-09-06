import "./ThreadList.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import ThreadListItem from "./ThreadListItem";
import {
    refreshThreadStart,
    refreshThreadEnd,
    setThread,
    selectCategory,
} from "../actions";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import ThreadSkeleton from "./ThreadSkeleton";

function ThreadList() {
    const dispatch = useDispatch();
    const { category, userId } = useParams();
    const [skip, setSkip] = useState(0);
    const currentThreads = useSelector((state) => state.threads.list);
    const isRefreshing = useSelector((state) => state.refreshThread);
    const currentCategory = useSelector(
        (state) => state.selectCategory.category
    );
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(refreshThreadStart());
        if (typeof category === "undefined") {
            axios.get(`/threads?skip=${0}`).then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 400);
            });
        } else {
            dispatch(selectCategory(category));
        }
    }, []);

    // Load threads after selected a category
    useEffect(() => {
        if (typeof category === "undefined") {
            return;
        }

        dispatch(refreshThreadStart());

        // If category = general, load ALL threads
        if (currentCategory === "general") {
            axios.get(`/threads?skip=${0}`).then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 400);
            });
            return;
        }

        // Get trending list
        if (currentCategory === "trending") {
            axios.get(`/thread/trending`).then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 400);
            });
            return;
        }

        // Get the corresponding category
        axios.get(`/thread/category/${category}?skip=${0}`).then((response) => {
            setTimeout(() => {
                dispatch(setThread(response.data));
                dispatch(refreshThreadEnd());
            }, 400);
        });
    }, [category]);

    // Find threads of a user
    useEffect(() => {
        if (typeof userId === "undefined") {
            return;
        }
        dispatch(refreshThreadStart());
    }, [userId]);

    // Infinite scroll
    useEffect(() => {
        if (skip === 0 || skip > 100) {
            // Limit the threads to 100
            return;
        }

        if (category === "general") {
            axios.get(`/threads?skip=${skip}`).then((response) => {
                dispatch(setThread([...currentThreads, ...response.data]));
            });
            return;
        }

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

        // Scroll to top when refresh
        document.getElementById("thread_scroller").scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        // Refresh of search result is done in side menu
        if (currentCategory === "Search Result") {
            setTimeout(() => {
                dispatch(refreshThreadEnd());
            }, 400);

            return;
        }

        // If it is showing user's threads, load threads for the user again
        if (
            currentCategory === user?.displayName ||
            (typeof userId !== "undefined" && typeof category === "undefined")
        ) {
            dispatch(refreshThreadStart());
            axios.get(`/user/profile/?userId=${userId}`).then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 500);
            });
            return;
        }

        // Get trending list
        if (currentCategory === "trending") {
            axios.get(`/thread/trending`).then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 400);
            });
            return;
        }

        setSkip(0);
        // If category = general, load ALL threads
        if (currentCategory === "general") {
            axios.get(`/threads?skip=${0}`).then((response) => {
                setTimeout(() => {
                    dispatch(setThread(response.data));
                    dispatch(refreshThreadEnd());
                }, 500);
            });
            return;
        }

        // Load threads of the corresponding category again
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
        //console.log(
        //    `offsetHeight: ${offsetHeight} scrollTop: ${scrollTop} scrollHeight: ${scrollHeight}`
        //);
        if (offsetHeight + scrollTop + 1 >= scrollHeight) {
            if (typeof userId !== "undefined") {
                return;
            }
            setSkip(currentThreads.length);
            console.log(skip);
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
