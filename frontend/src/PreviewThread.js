import React from "react";
import "./PreviewThread.css";
import { useSelector, useDispatch } from "react-redux";
import ReplyBlock from "./ReplyBlock";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { togglePreviewThread } from "./actions";

function PreviewThread({ title, content }) {
    // For toggling
    const style = useSelector((state) => state.togglePreviewThread);
    const dispatch = useDispatch();

    return (
        <div
            className="preview_thread"
            style={{
                display: style.display,
            }}
        >
            <div className="preview_thread_overlay" />
            <div className="preview_thread_window">
                <div
                    className="preview_thread_exit_button"
                    onClick={() => dispatch(togglePreviewThread())}
                >
                    Exit Previewing Mode
                </div>
                <div className="nav_bar_right">
                    <div
                        className="nav_bar_right_go_back_button"
                        onClick={() => dispatch(togglePreviewThread())}
                    >
                        <ArrowBackIcon id="go_back_icon" />
                    </div>
                    <div className="nav_bar_right_thread_topic">{title}</div>
                    <div className="nav_bar_right_reply_button">
                        <ReplyIcon id="reply_icon" />
                    </div>
                </div>
                <ReplyBlock
                    id={0}
                    floor={`##`}
                    author={"username"}
                    time={"time"}
                    content={content}
                    upvote={0}
                    downvote={0}
                />
            </div>
        </div>
    );
}

export default PreviewThread;
