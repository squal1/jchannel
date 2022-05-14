import React, { useEffect, useState } from "react";
import "./ReplyList.css";
import ReplyBlock from "./ReplyBlock";
import { useParams } from "react-router-dom";
import axios from "./axios";

function ReplyList() {
    const { _id } = useParams();
    const [reply, setReply] = useState([]);

    // Load Reply after selected a thread
    useEffect(() => {
        if (typeof _id === "undefined") {
            return;
        }
        axios.get(`/thread/reply/${_id}`).then((response) => {
            setReply(response.data.reply);
        });
    }, [_id]);

    return (
        <div className="thread_content">
            {reply ? (
                <div>
                    {reply.map((item, index) => {
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
            <div className="end_of_thread_content">&nbsp;</div>
        </div>
    );
}

export default ReplyList;
