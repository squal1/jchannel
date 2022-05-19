import React from "react";
import "./ReplyBlock.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import axios from "./axios";
import moment from "moment";

function ReplyBlock({ id, floor, author, time, content, upvote, downvote }) {
    // Todo: prevent multiple upvote/downvote
    const handleUpvote = () => {
        axios
            .post(`/upvote/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleDownvote = () => {
        axios
            .post(`/downvote/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="thread_reply">
            <div className="thread_reply_container">
                <div className="reply_upper_level">
                    <div className="reply_floor">{floor}</div>
                    <div className="reply_author">{author}</div>
                    <div className="reply_time">
                        {moment(time).format("L h:mma")}
                    </div>
                </div>
                <div className="reply_mid_level">
                    <div className="reply_content">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
                <div className="reply_base_level">
                    <div className="vote">
                        <ThumbUpAltIcon
                            className="upvote_button"
                            onClick={() => handleUpvote()}
                        />
                        <div className="upvote_score">{upvote}</div>
                        <ThumbDownAltIcon
                            className="downvote_button"
                            onClick={() => handleDownvote()}
                        />
                        <div className="downvote_score">{downvote}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyBlock;
