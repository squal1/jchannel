import React from "react";
import "./Preview.css";
import { useSelector } from "react-redux";
import PageItem from "../../ReplyList/ReplyListPage/PageItem";

function PreviewReply({ content }) {
    // For toggling
    const style = useSelector((state) => state.togglePreviewReply);
    const user = useSelector((state) => state.user);
    const quote = useSelector((state) => state.quoteReply);

    return (
        <div
            className="preview_reply"
            style={{
                display: style.display,
                height: quote ? "70%" : "79%",
            }}
        >
            <div className="preview_reply_window">
                <PageItem
                    id={0}
                    floor={`##`}
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

export default PreviewReply;
