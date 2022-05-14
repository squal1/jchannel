import React, { useEffect, useState } from "react";
import "./ReplyList.css";
import ReplyBlock from "./ReplyBlock";
import { useParams } from "react-router-dom";
import axios from "./axios";
import { useSelector, useDispatch } from "react-redux";
import { setReply } from "./actions";
import ReplyPage from "./ReplyPage";

function ReplyList() {
    const pageSize = 25;
    const dispatch = useDispatch();
    const { _id } = useParams();
    const [skip, setSkip] = useState(0);
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
        if (offsetHeight + scrollTop + 10 >= scrollHeight) {
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
            {/*<div className="end_of_thread_content">&nbsp;</div>*/}
        </div>
    );
}

export default ReplyList;
