import React from "react";
import "./ReplyList.css";
import ReplyBlock from "./ReplyBlock";
import { useSelector, useDispatch } from "react-redux";

function ReplyList() {
    const selectThread = useSelector((state) => state.selectThread);

    return (
        <div className="thread_content">
            {selectThread.currentThread._id ? (
                <div>
                    {selectThread.currentThread.reply.map((item, index) => {
                        return (
                            <ReplyBlock
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
