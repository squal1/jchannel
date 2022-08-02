import "./ThreadListItem.css";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectThread } from "../../actions";
import { useNavigate } from "react-router";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function ThreadListItem({ thread }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);

    const handleSelectThread = () => {
        setSelected(true);
        navigate(`/thread/${thread._id}`);
        dispatch(selectThread(thread));
        document.getElementById("reply_scroller").style.zIndex = "30";
        document.getElementById("nav_bar_right").style.zIndex = "30";
    };

    return (
        <div className="thread_block" onClick={() => handleSelectThread()}>
            <div className="thread_block_container">
                <div className="thread_block_upper_level">
                    <div className="thread_block_upper_level_left">
                        <div className="thread_block_username_container">
                            <div
                                className="thread_block_username"
                                style={{
                                    color: thread.author.verified
                                        ? "rgb(248, 183, 123)"
                                        : "white",
                                }}
                            >
                                {thread.author.displayName}
                            </div>
                        </div>
                        <div className="fire_icon">
                            <LocalFireDepartmentIcon />
                        </div>
                        <div className="thread_block_vote_score">
                            {thread.reply[0]?.upvote -
                                thread.reply[0]?.downvote}
                        </div>
                        <div className="reply_count_icon">
                            <ForumRoundedIcon />
                        </div>
                        <div className="thread_block_reply_count">
                            {thread.reply.length}
                        </div>
                    </div>
                    <div className="thread_block_last_reply_time">
                        {moment(thread.lastReplied).fromNow(true)}
                    </div>
                </div>
                <div className="thread_block_lower_half">
                    <div
                        className="thread_topic"
                        style={{ color: selected ? "#7a7a7a" : "#f0f8ff" }}
                    >
                        {thread.title}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThreadListItem;
