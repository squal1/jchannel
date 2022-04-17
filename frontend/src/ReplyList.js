import React from "react";
import "./ReplyList.css";
import ReplyBlock from "./ReplyBlock";
import { useSelector, useDispatch } from "react-redux";

function ReplyList() {
    const selectThread = useSelector((state) => state.selectThread);

    return (
        <div className="thread_content">
            {selectThread.currentThread._id ? (
                <ReplyBlock
                    author={selectThread.currentThread.author.username}
                    time={selectThread.currentThread.createdAt}
                    content={selectThread.currentThread.content}
                    upVote={selectThread.currentThread.upVote}
                    downVote={selectThread.currentThread.downVote}
                />
            ) : (
                <>
                    <div className="end_of_thread_content">&nbsp;</div>
                </>
            )}
        </div>
    );
}

export default ReplyList;
