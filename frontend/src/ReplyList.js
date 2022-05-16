import "./ReplyList.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshReplyStart, refreshReplyEnd, setReply } from "./actions";
import axios from "./axios";
import ReplyPage from "./ReplyPage";
import RefreshIcon from "@mui/icons-material/Refresh";

function ReplyList() {
    const pageSize = 25;
    const dispatch = useDispatch();
    const { _id } = useParams();
    const [skip, setSkip] = useState(0);
    const isRefreshing = useSelector((state) => state.refreshReply);
    const currentReplies = useSelector((state) => state.replies.list);

    // Load Reply after selected a thread
    useEffect(() => {
        if (typeof _id === "undefined") {
            return;
        }
        setSkip(0);
        axios.get(`/thread/reply/${_id}?skip=${0}`).then((response) => {
            setTimeout(() => {
                dispatch(setReply([response.data.reply]));
            }, 200);
        });
    }, [_id]);

    // Refresh reply list
    useEffect(() => {
        if (isRefreshing !== true) {
            return;
        }
        // Get all replies and split to arrays with size of 25
        // Count = 500 since max reply for a post is 500
        axios
            .get(`/thread/reply/${_id}?skip=${0}&count=${500}`)
            .then((response) => {
                var replies = [];
                while (response.data.reply.length > 0) {
                    replies.push(response.data.reply.splice(0, 25));
                }
                setTimeout(() => {
                    dispatch(setReply(replies));
                    dispatch(refreshReplyEnd());
                }, 200);
            });
    }, [isRefreshing]);

    // Infinite scroll
    useEffect(() => {
        axios.get(`/thread/reply/${_id}?skip=${skip}`).then((response) => {
            // Case when no reply on new page
            if (response.data.reply.length === 0) {
                return;
            }
            // Append new replies to the list
            dispatch(setReply([...currentReplies, [...response.data.reply]]));
        });
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;
        console.log(
            `offsetHeight: ${offsetHeight} scrollTop: ${scrollTop} scrollHeight: ${scrollHeight}`
        );
        if (offsetHeight + scrollTop + 50 >= scrollHeight) {
            // Won't load more reply if there is not a full page at the end
            if (currentReplies[currentReplies.length - 1].length < 25) {
                return;
            }
            console.log(currentReplies.length * pageSize);
            setSkip(currentReplies.length * pageSize);
        }
    };

    return (
        <div className="reply_list" id="reply_scroller" onScroll={handleScroll}>
            {currentReplies ? (
                <div>
                    {currentReplies.map((item, index) => {
                        return <ReplyPage pageNumber={index} replies={item} />;
                    })}
                </div>
            ) : (
                <></>
            )}
            <div className="reply_list_footer">
                <div
                    className="reply_list_refresh_button"
                    onClick={() => dispatch(refreshReplyStart())}
                    style={{
                        pointerEvents: isRefreshing ? "none" : "auto",
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
            </div>
        </div>
    );
}

export default ReplyList;
