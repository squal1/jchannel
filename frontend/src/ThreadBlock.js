import React from "react";
import "./ThreadBlock.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const selectTopic = () => {
    return null;
    /*history.push(`/post/${id}`);*/
};

function ThreadBlock({ author, time, title, score, id }) {
    return (
        <div className="thread_block" onClick={selectTopic}>
            <div className="thread_block_container">
                <div className="thread_block_upper_level">
                    <div className="thread_block_upper_level_left">
                        <div className="thread_block_username">{author}</div>
                        <div className="fire_icon">
                            <LocalFireDepartmentIcon />
                        </div>
                        <div className="thread_block_vote_score">{score}</div>
                    </div>
                    <div className="thread_block_last_reply_time">{time}</div>
                </div>
                <div className="thread_block_lower_half">
                    <div className="thread_topic">{title}</div>
                </div>
            </div>
        </div>
    );
}

export default ThreadBlock;
