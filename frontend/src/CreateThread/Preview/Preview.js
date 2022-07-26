import React from "react";
import "./Preview.css";
import { useSelector, useDispatch } from "react-redux";
import PageItem from "../../ReplyList/ReplyListPage/PageItem";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { togglePreviewThread } from "../../actions";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

function PreviewThread({ title, content }) {
    // For toggling
    const style = useSelector((state) => state.togglePreviewThread);
    const user = useSelector((state) => state.user);
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
                    <div className="nav_bar_right_thread_topic_container">
                        <div className="nav_bar_right_thread_topic">
                            {title}
                        </div>
                    </div>
                    <div className="nav_bar_right_scroll_to_bottom_button">
                        <VerticalAlignBottomIcon />
                    </div>
                    <div className="nav_bar_right_reply_button">
                        <ReplyIcon id="reply_icon" />
                    </div>
                </div>
                <PageItem
                    id={0}
                    floor={`#1`}
                    author={user?.displayName}
                    time={new Date()}
                    content={content}
                    upvote={0}
                    downvote={0}
                    preview={true}
                />
            </div>
        </div>
    );
}

export default PreviewThread;
