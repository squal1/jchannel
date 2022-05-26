import React from "react";
import "./ReplyBlockSkeleton.css";

function ReplyBlockSkeleton() {
    return (
        <div className="thread_reply_placeholder">
            <div class="reply_placeholder_item">
                <div className="thread_reply_container">
                    <div className="reply_upper_level">
                        <div className="reply_floor_placeholder">&nbsp;</div>
                        <div className="reply_author_placeholder">&nbsp;</div>
                        <div className="reply_time_placeholder">&nbsp;</div>
                    </div>
                    <div className="reply_mid_level">
                        <div className="reply_content_placeholder">&nbsp;</div>
                    </div>
                    <div className="reply_base_level">
                        <div className="vote_placeholder">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyBlockSkeleton;
