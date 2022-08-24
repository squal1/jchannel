import "./ReplyList.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    refreshReplyStart,
    refreshReplyEnd,
    setReply,
    selectThread,
    changeThreadEnd,
} from "../actions";
import axios from "../axios";
import ReplyListPage from "./ReplyListPage";
import ReplyBlockSkeleton from "./ReplyListPage/Skeleton/Skeleton";
import RefreshIcon from "@mui/icons-material/Refresh";

function ReplyList() {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const [skip, setSkip] = useState(0);
    const [fullyLoaded, setFullyLoaded] = useState(false);
    const isRefreshing = useSelector((state) => state.refreshReply);
    const isChangingThread = useSelector((state) => state.changeThread);
    const currentThread = useSelector(
        (state) => state.selectThread.currentThread
    );
    const currentReplies = useSelector((state) => state.replies.list);
    const selectedReplyPage = useSelector((state) => state.selectReplyPage);
    const [startingPage, setStartingPage] = useState(1);

    function updateReplyList(skip, count, appendList) {
        //Case when directly access the thread from url
        if (currentThread.category === "") {
            axios.get(`/thread/?id=${_id}`).then((response) => {
                console.log(response.data);
                dispatch(selectThread(response.data));
            });
        }

        axios
            .get(
                `/reply/${_id || currentThread._id}?skip=${skip}&count=${count}`
            )
            .then((response) => {
                if (response.data.reply.length === 0) {
                    setFullyLoaded(true);
                    return;
                }

                let replies = [];
                while (response.data.reply.length > 0) {
                    replies.push(response.data.reply.splice(0, 25));
                }

                setTimeout(() => {
                    if (appendList === true) {
                        // Append the list
                        dispatch(setReply([...currentReplies, ...replies]));
                    } else {
                        // appendList === false
                        // Reset the list
                        dispatch(setReply(replies));
                    }
                    if (replies[replies.length - 1]?.length < 25) {
                        setFullyLoaded(true);
                    } else {
                        setFullyLoaded(false);
                    }
                    dispatch(changeThreadEnd());
                    dispatch(refreshReplyEnd());
                }, 200);
            });
    }

    // Load Reply after selected a thread
    useEffect(() => {
        if (typeof _id === "undefined" && isChangingThread === false) {
            return;
        }

        // Scroll to top when a new thread is selected
        document.getElementById("reply_scroller").scrollTo({
            top: 0,
            left: 0,
        });
        //setSkip(0);
        setStartingPage(1);
        updateReplyList(0, 25, false);
    }, [_id, isChangingThread]);

    // Jump to certain page
    useEffect(() => {
        // Scroll to top
        document.getElementById("reply_scroller").scrollTo({
            top: 0,
            left: 0,
        });
        setStartingPage(selectedReplyPage);
        updateReplyList((selectedReplyPage - 1) * 25, 25, false);
    }, [selectedReplyPage]);

    // Refresh reply list at the bottom of reply list
    useEffect(() => {
        if (isRefreshing === false) {
            return;
        }
        if (startingPage === 1) {
            // Get all 500 replies
            updateReplyList(0, 500, false);
            return;
        }
        if (startingPage !== 1) {
            // Skip all replies before starting page
            updateReplyList((startingPage - 1) * 25, 500, false);
        }
    }, [isRefreshing]);

    // Infinite scroll
    useEffect(() => {
        // Get more replies
        updateReplyList(skip, 25, true);
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;
        if (offsetHeight + scrollTop + 1 >= scrollHeight) {
            // Return if the component is just loaded (scrollTop = 0)
            if (scrollTop === 0) {
                return;
            }

            // Won't trigger infinite scroll if there is not a full page at the end
            if (currentReplies[currentReplies.length - 1].length < 25) {
                return;
            }

            // When the new value of skip equals to the old one,
            // useEffect won't trigger, thus need to update here
            if ((currentReplies.length + startingPage - 1) * 25 === skip) {
                updateReplyList(skip, 25, true);
                return;
            }

            setSkip((currentReplies.length + startingPage - 1) * 25);
        }
    };

    if (isChangingThread === true) {
        return (
            <div
                className="reply_list_container"
                id="reply_scroller"
                onScroll={handleScroll}
            >
                <ReplyBlockSkeleton />
                <ReplyBlockSkeleton />
                <ReplyBlockSkeleton />
                <ReplyBlockSkeleton />
            </div>
        );
    }

    return (
        <div
            className="reply_list_container"
            id="reply_scroller"
            onScroll={handleScroll}
        >
            {currentReplies.length > 0 ? (
                <div className="reply_list">
                    {currentReplies.map((item, index) => {
                        return (
                            <ReplyListPage
                                key={index}
                                pageNumber={startingPage + index}
                                replies={item}
                            />
                        );
                    })}
                    <div className="reply_list_footer">
                        {fullyLoaded ? (
                            <div
                                className="reply_list_refresh_button"
                                onClick={() => dispatch(refreshReplyStart())}
                                style={{
                                    pointerEvents: isRefreshing
                                        ? "none"
                                        : "auto",
                                    borderColor: isRefreshing
                                        ? "rgb(100, 100, 100)"
                                        : "rgb(248, 183, 123)",
                                }}
                            >
                                {isRefreshing ? (
                                    <RefreshIcon className="reply_list_refresh_icon" />
                                ) : (
                                    <div>Refresh</div>
                                )}
                            </div>
                        ) : (
                            <ReplyBlockSkeleton />
                        )}
                    </div>
                </div>
            ) : (
                <div className="intro">
                    <h1>Welcome</h1>
                    <h3>What is jchannel?</h3>
                    <p>
                        Jchannel is an online forum where Jessup students and
                        staff can communicate, post comments and share images on
                        a variety of topics. The site was developed purely by a
                        student and is currently on a test run. Jchannel is not
                        affiliated with any party, but simply serves as an
                        independent communication platform. Users can log in
                        with your school email to enjoy all the features of the
                        site and become part of the community.
                    </p>
                    <p>
                        Make sure to familiarize yourself with the
                        <a href="/FAQ/index.html"> Rules and FAQ </a>before
                        posting and replying. Email jchannel2023@gmail.com for
                        any further questions.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ReplyList;
