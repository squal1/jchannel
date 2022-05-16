import React from "react";
import "./ReplyPage.css";
import ReplyBlock from "./ReplyBlock";

function ReplyPage({ pageNumber, replies }) {
    return (
        <div>
            <div className="reply_page_header">Page{pageNumber + 1}</div>
            {replies.map((item, index) => {
                return (
                    <ReplyBlock
                        key={item._id}
                        id={item._id}
                        floor={`#${pageNumber * 25 + index + 1}`}
                        author={item.author.username}
                        time={item.time}
                        content={item.content}
                        upvote={item.upvote}
                        downvote={item.downvote}
                    />
                );
            })}
        </div>
    );
}

export default ReplyPage;
