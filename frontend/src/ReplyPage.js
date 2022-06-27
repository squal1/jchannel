import React from "react";
import "./ReplyPage.css";
import ReplyBlock from "./ReplyBlock";

function ReplyPage({ pageNumber, replies }) {
    return (
        <div>
            <div className="reply_page_header">Page {pageNumber}</div>
            {replies.map((item, index) => {
                return (
                    <ReplyBlock
                        key={item._id}
                        floor={`#${(pageNumber - 1) * 25 + index + 1}`}
                        author={item.author.displayName}
                        time={item.time}
                        content={item.content}
                        upvote={item.upvote}
                        downvote={item.downvote}
                        upvotedBy={item.upvotedBy}
                        downvotedBy={item.downvotedBy}
                    />
                );
            })}
        </div>
    );
}

export default ReplyPage;
