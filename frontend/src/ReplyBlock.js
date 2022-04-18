import React from "react";
import "./ReplyBlock.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function ReplyBlock({ floor, author, time, content, upVote, downVote }) {
    return (
        <div className="thread_reply">
            <div className="thread_reply_container">
                <div className="reply_upper_level">
                    <div className="reply_floor">{floor}</div>
                    <div className="reply_author">{author}</div>
                    <div className="reply_time">{time}</div>
                </div>
                <div className="reply_mid_level">
                    <div className="reply_content">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
                <div className="reply_base_level">
                    <div className="vote">
                        <ThumbUpAltIcon className="upvote_button" />
                        <div className="upvote_score">{upVote}</div>
                        <ThumbDownAltIcon className="downvote_button" />
                        <div className="downvote_score">{downVote}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyBlock;
