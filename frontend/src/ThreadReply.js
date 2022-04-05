import React from "react";
import "./ThreadReply.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function ThreadReply() {
    return (
        <div className="thread_reply">
            <div className="thread_reply_container">
                <div className="reply_upper_level">
                    <div className="reply_floor">#1</div>
                    <div className="reply_username">Admin</div>
                    <div className="reply_time">30min</div>
                </div>
                <div className="reply_mid_level">
                    <div className="reply_content">
                        This is the reply content. This is the reply content.
                        This is the reply content.This is the reply content.
                        This is the reply content.
                    </div>
                </div>
                <div className="reply_base_level">
                    <div className="vote">
                        <ThumbUpAltIcon className="upvote_button" />
                        <div className="upvote_score">10</div>
                        <ThumbDownAltIcon className="downvote_button" />
                        <div className="downvote_score">2</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThreadReply;
