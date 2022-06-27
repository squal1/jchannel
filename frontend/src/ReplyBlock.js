import React, { useState, useEffect, useRef } from "react";
import "./ReplyBlock.css";
import { useSelector, useDispatch } from "react-redux";
import { loginMenuOpen } from "./actions";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import axios from "./axios";
import moment from "moment";

function ReplyBlock({
    key,
    floor,
    author,
    time,
    content,
    upvote,
    downvote,
    upvotedBy,
    downvotedBy,
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNumber, setUpvoteNumber] = useState(upvote);
    const [downvoteNumber, setDownvoteNumber] = useState(downvote);

    useEffect(() => {
        if (upvotedBy?.includes(user?._id)) {
            setUpvoted(true);
        }
        if (downvotedBy?.includes(user?._id)) {
            setDownvoted(true);
        }
    }, []);

    const handleUpvote = () => {
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        setUpvoteNumber(upvoteNumber + 1);
        setUpvoted(true);
        axios
            .post(`/upvote/${key}?userId=${user._id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleDownvote = () => {
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        setDownvoteNumber(downvoteNumber + 1);
        setDownvoted(true);
        axios
            .post(`/downvote/${key}?userId=${user._id}`)
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
                            style={{
                                cursor:
                                    upvoted || downvoted ? "auto" : "pointer",
                                pointerEvents:
                                    upvoted || downvoted ? "none" : "all",
                                color: upvoted
                                    ? "rgb(231, 91, 91)"
                                    : "rgb(240, 248, 255)",
                            }}
                            className="upvote_button"
                            onClick={() => handleUpvote()}
                        />
                        <div
                            className="upvote_score"
                            style={{
                                color: upvoted
                                    ? "rgb(248, 183, 123)"
                                    : "rgb(240, 248, 255)",
                            }}
                        >
                            {upvoteNumber}
                        </div>
                        <ThumbDownAltIcon
                            style={{
                                cursor:
                                    upvoted || downvoted ? "auto" : "pointer",
                                pointerEvents:
                                    upvoted || downvoted ? "none" : "all",
                                color: downvoted
                                    ? "rgb(91, 154, 231)"
                                    : "rgb(240, 248, 255)",
                            }}
                            className="downvote_button"
                            onClick={() => handleDownvote()}
                        />
                        <div
                            className="downvote_score"
                            style={{
                                color: downvoted
                                    ? "rgb(248, 183, 123)"
                                    : "rgb(240, 248, 255)",
                            }}
                        >
                            {downvoteNumber}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyBlock;
