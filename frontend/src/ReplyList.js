import React, { useEffect, useState } from "react";
import "./ReplyList.css";
import ReplyBlock from "./ReplyBlock";
import { useParams } from "react-router-dom";
import axios from "./axios";
import { useSelector, useDispatch } from "react-redux";
import { setReply } from "./actions";
function ReplyList() {
    const dispatch = useDispatch();
    const { _id } = useParams();
    //const [reply, setReply] = useState([]);
    const [skip, setSkip] = useState(0);
    const currentReplies = useSelector((state) => state.replies.list);

    // Load Reply after selected a thread
    useEffect(() => {
        if (typeof _id === "undefined") {
            return;
        }
        axios.get(`/thread/reply/${_id}?skip=${0}`).then((response) => {
            dispatch(setReply(response.data.reply));
        });
    }, [_id]);

    // Infinite scroll
    useEffect(() => {
        axios.get(`/thread/reply/${_id}?skip=${skip}`).then((response) => {
            // Append the new threads threads list

            dispatch(setReply([...currentReplies, ...response.data.reply]));
        });
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;
        console.log(
            `offsetHeight: ${offsetHeight} scrollTop: ${scrollTop} scrollHeight: ${scrollHeight}`
        );
        if (offsetHeight + scrollTop + 1 >= scrollHeight) {
            console.log(currentReplies.length);
            setSkip(currentReplies.length);
        }
    };

    return (
        <div className="reply_list" id="reply_scroller" onScroll={handleScroll}>
            {currentReplies ? (
                <div>
                    {currentReplies.map((item, index) => {
                        return (
                            <ReplyBlock
                                key={item._id}
                                id={item._id}
                                floor={`#${index + 1}`}
                                author={item.author.username}
                                time={item.time}
                                content={item.content}
                                upvote={item.upvote}
                                downvote={item.downvote}
                            />
                        );
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
