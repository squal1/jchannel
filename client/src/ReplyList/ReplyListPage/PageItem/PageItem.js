import React, { useState, useEffect } from "react";
import "./PageItem.css";
import { useSelector, useDispatch } from "react-redux";
import {
    addQuote,
    loginMenuOpen,
    selectCategory,
    toggleCreateReply,
} from "../../../actions";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "../../../axios";
import moment from "moment";
import { Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";

function PageItem({
    id,
    floor,
    author,
    authorId,
    verified,
    time,
    content,
    upvote,
    downvote,
    upvotedBy,
    downvotedBy,
    quote,
    admin,
    preview = false,
}) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const currentThread = useSelector(
        (state) => state.selectThread.currentThread
    );
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteNumber, setUpvoteNumber] = useState(upvote);
    const [downvoteNumber, setDownvoteNumber] = useState(downvote);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (upvotedBy?.includes(user?._id)) {
            setUpvoted(true);
        }
        if (downvotedBy?.includes(user?._id)) {
            setDownvoted(true);
        }
    }, []);

    const handleCopyReplyID = () => {
        navigator.clipboard.writeText(id);
        handleClose();
    };

    const handleUpvote = () => {
        if (preview === true) {
            return;
        }

        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        setUpvoteNumber(upvoteNumber + 1);
        setUpvoted(true);
        axios
            .post(
                `/upvote/${id}?threadId=${currentThread._id}&userId=${user._id}`,
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleDownvote = () => {
        if (preview === true) {
            return;
        }

        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        setDownvoteNumber(downvoteNumber + 1);
        setDownvoted(true);
        axios
            .post(
                `/downvote/${id}?threadId=${currentThread._id}&userId=${user._id}`,
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleQuoteReply = () => {
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }

        if (preview === true) {
            return;
        }
        dispatch(addQuote({ id, floor, author, content }));
        dispatch(toggleCreateReply());
    };

    const handleViewProfile = () => {
        document.getElementById("reply_scroller").style.zIndex = "0";
        document.getElementById("nav_bar_right").style.zIndex = "0";
        dispatch(selectCategory(author));
        navigate(`/profile/${authorId}`);
    };

    return (
        <div className="thread_reply">
            <div className="thread_reply_container">
                <div className="reply_upper_level">
                    <div className="reply_floor">{floor}</div>
                    <div
                        className="reply_author"
                        style={{
                            color: admin ? "rgb(248, 183, 123)" : "white",
                        }}
                        onClick={handleViewProfile}
                    >
                        {author}
                    </div>
                    {verified && (
                        <VerifiedIcon
                            style={{
                                color: admin ? "rgb(248, 183, 123)" : "white",
                                scale: 0.8,
                                marginLeft: "2px",
                            }}
                            className="reply_verified_icon"
                        />
                    )}
                    {author === currentThread.author.displayName && (
                        <div className="reply_OP">OP</div>
                    )}
                    <div className="reply_time">
                        {moment(time).format("L h:mma")}
                    </div>
                    <MoreHorizIcon
                        style={{ marginLeft: "auto", cursor: "pointer" }}
                        onClick={handleClick}
                    />
                    <Menu
                        id="page_item_menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleCopyReplyID}>
                            Copy reply ID
                        </MenuItem>
                    </Menu>
                </div>
                <div className="reply_mid_level">
                    <div className="reply_quote">
                        <div className="vl" />
                        <div
                            className="reply_quote_content"
                            dangerouslySetInnerHTML={{ __html: quote?.content }}
                        />
                    </div>
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
                    <Tooltip title="Quote this reply" arrow disableInteractive>
                        <ReplyIcon
                            className="quote_icon"
                            onClick={() => handleQuoteReply()}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default PageItem;
