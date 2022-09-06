import React, { useState, useEffect } from "react";
import "./CreateReply.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearQuote,
    refreshReplyStart,
    toggleCreateReply,
    togglePreviewReply,
} from "../actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Editor } from "@tinymce/tinymce-react";
//import "tinymce/skins/ui/1.0/skin.css";
import "../skin.css";
//import "tinymce/skins/ui/1.0/content.inline.css";
import "../content.inline.css";
import DOMPurify from "dompurify";
import axios from "../axios";
import { Snackbar, Alert } from "@mui/material";
import PreviewReply from "./Preview";

function CreateReply() {
    const dispatch = useDispatch();
    const [sumbitted, setSubmitted] = useState(false);
    const user = useSelector((state) => state.user);
    const quote = useSelector((state) => state.quoteReply);
    const selectThread = useSelector((state) => state.selectThread);
    const style = useSelector((state) => state.toggleCreateReply);
    const previewState = useSelector(
        (state) => state.togglePreviewReply.display
    );

    // Snackbar status
    const [alertOpen, setAlertOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        severity: "error",
        content: "",
    });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    // Content of the new reply
    const [content, setContent] = useState("");

    const handleSumbit = () => {
        // Input Check
        if (content === "") {
            // Error message
            setSnackbarInfo({
                severity: "error",
                content: "Reply can't be empty. Please try again.",
            });
            setAlertOpen(true);
            return;
        }

        const newReply = {
            author: user._id,
            content: content,
            quote: quote?.id,
        };
        // Create new reply here
        axios
            .post(`/reply/${selectThread.currentThread._id}`, newReply, {
                withCredentials: true,
            })
            .then((response) => {
                // Success message
                setSnackbarInfo({
                    severity: "success",
                    content: "Reply created.",
                });
                setAlertOpen(true);

                // Reset variables

                setContent("");
                setSubmitted(true);
                dispatch(clearQuote());
                if (previewState === "flex") {
                    dispatch(togglePreviewReply());
                }
                dispatch(refreshReplyStart());
            })
            .catch((error) => {
                // Error message
                setSnackbarInfo({
                    severity: "error",
                    content: error.response.data.message,
                });
                setAlertOpen(true);
            });

        dispatch(toggleCreateReply());
    };

    // For resetting tinymce
    useEffect(() => {
        if (sumbitted === true) {
            setSubmitted(false);
        }
    }, [sumbitted]);

    return (
        <div>
            <div
                className="create_reply"
                style={{
                    display: style.display,
                }}
            >
                <div className="create_reply_header">
                    <div className="create_reply_header_upper">
                        <p>Replying:</p>
                        <input
                            value={selectThread.currentThread.title}
                            disabled
                        />
                        <div
                            className="create_reply_exit_button"
                            onClick={() => {
                                dispatch(clearQuote());
                                dispatch(toggleCreateReply());
                            }}
                        >
                            <ClearRoundedIcon />
                        </div>
                    </div>
                    {quote && (
                        <div className="create_reply_header_lower">
                            <p>Quoting: {quote.floor}</p>
                        </div>
                    )}
                </div>
                <div className="create_reply_body">
                    {/* Hidden. Appear when toggled */}
                    <PreviewReply content={content} />
                    {!sumbitted ? (
                        <Editor
                            apiKey="n6yu8t20ieccyzq70g4q8hqld8siccaoj0fa11nqkdj4kdds"
                            initialValue="<p></p>"
                            init={{
                                selector: ".editor",
                                content_css: "default",
                                skin: false,
                                content_style: "body { color: white; }",
                                menubar: false,
                                resize: false,
                                height: "99%",
                                width: "97%",
                                plugins: [
                                    "advlist autolink lists link image",
                                    "charmap print preview anchor help",
                                    "searchreplace visualblocks code",
                                    "insertdatetime media table paste wordcount",
                                ],

                                toolbar: [
                                    " fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright ",
                                    " bullist numlist | image media link | help ",
                                ],
                            }}
                            onEditorChange={(context, editor) =>
                                setContent(context)
                            }
                        />
                    ) : (
                        <></>
                    )}
                </div>

                <div className="create_reply_footer">
                    <div
                        className="preview_reply_button"
                        onClick={() => dispatch(togglePreviewReply())}
                    >
                        <p>Preview</p>
                    </div>
                    <div
                        className="sumbit_reply_button"
                        onClick={() => handleSumbit()}
                    >
                        <p>Submit</p>
                    </div>
                </div>
            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarInfo.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbarInfo.content}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CreateReply;
