import React from "react";
import "./ReplyListPage.css";
import PageItem from "./PageItem";

function ReplyListPage({ pageNumber, replies }) {
    return (
        <div>
            <div className="reply_page_header">Page {pageNumber}</div>

            {replies.map((item, index) => {
                return (
                    <PageItem
                        key={item._id}
                        id={item._id}
                        floor={`#${(pageNumber - 1) * 25 + index + 1}`}
                        author={item.author.displayName}
                        verified={item.author.verified}
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

export default ReplyListPage;
