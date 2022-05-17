import React from "react";
import "./PreviewReply.css";
import { useSelector, useDispatch } from "react-redux";
import ReplyBlock from "./ReplyBlock";

function PreviewReply({ content }) {
    // For toggling
    const style = useSelector((state) => state.togglePreviewReply);
    const dispatch = useDispatch();

    return (
        <div
            className="preview_reply"
            style={{
                display: style.display,
            }}
        >
            <div className="preview_reply_window">
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

export default PreviewReply;
