import React from "react";
import ReplyBlock from "./ReplyBlock";

function ReplyPage({ pageNumber, replies }) {
    return (
        <div>
            <h1>Page{pageNumber + 1}</h1>
            {replies.map((item, index) => {
                return (
                    <ReplyBlock
                        key={item._id}
                        id={item._id}
                        floor={`#${pageNumber * 25 + index}`}
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
