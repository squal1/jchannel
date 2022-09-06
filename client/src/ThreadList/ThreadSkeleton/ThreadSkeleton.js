import "./ThreadSkeleton.css";
import React, { useState } from "react";

function ThreadSkeleton() {
    return (
        <div className="thread_block_skeleton">
            <div className="thread_block_container">
                <div className="thread_block_upper_level">
                    <div className="thread_block_upper_level_left">
                        <div className="thread_block_username_container">
                            <div className="thread_block_username_placeholder">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    <div className="thread_block_last_reply_time_placeholder">
                        &nbsp;
                    </div>
                </div>
                <div className="thread_block_lower_half">
                    <div className="thread_topic_placeholder">&nbsp;</div>
                </div>
            </div>
        </div>
    );
}

export default ThreadSkeleton;
