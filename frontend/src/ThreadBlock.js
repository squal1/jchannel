import React from "react";
import "./ThreadBlock.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useDispatch } from "react-redux";
import { selectThread } from "./actions";
import { useNavigate } from "react-router";

function ThreadBlock({ thread }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectThread = () => {
        navigate(`/thread/${thread._id}`);
        dispatch(selectThread(thread));
    };

    return (
        <div className="thread_block" onClick={() => handleSelectThread()}>
            <div className="thread_block_container">
                <div className="thread_block_upper_level">
                    <div className="thread_block_upper_level_left">
                        <div className="thread_block_username">
                            {thread.author.username}
                        </div>
                        <div className="fire_icon">
                            <LocalFireDepartmentIcon />
                        </div>
                        <div className="thread_block_vote_score">
                            {thread.reply[0].upvote - thread.reply[0].downvote}
                        </div>
                    </div>
                    <div className="thread_block_last_reply_time">
                        {thread.lastReplied}
                    </div>
                </div>
                <div className="thread_block_lower_half">
                    <div className="thread_topic">{thread.title}</div>
                </div>
            </div>
        </div>
    );
}

export default ThreadBlock;
