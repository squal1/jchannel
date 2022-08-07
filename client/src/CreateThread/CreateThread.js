import "./CreateThread.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    toggleCreateThread,
    togglePreviewThread,
    selectCategory,
    refreshThreadStart,
    refreshThreadEnd,
    setThread,
} from "../actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
//import "tinymce/skins/ui/1.0/skin.css";
import "../skin.css";
//import "tinymce/skins/ui/1.0/content.inline.css";
import "../content.inline.css";
import axios from "../axios";
import DOMPurify from "dompurify";
import PreviewThread from "./Preview";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router";

function CreateThread() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [sumbitted, setSubmitted] = useState(false);
    const style = useSelector((state) => state.toggleCreateThread);
    const user = useSelector((state) => state.user);
    const currentCategory = useSelector(
        (state) => state.selectCategory.category
    );

    // Snackbar status
    const [alertOpen, setAlertOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        severity: "error",
        content: "",
    });

    // Styling react-select
    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            width: 200,
            color: "white",
            background: "#222222",
            borderRadius: "5px",
            borderColor: state.isFocused ? "#f8b77b" : "#505050",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "white",
        }),
        menu: (base) => ({
            ...base,
            marginTop: 0,
            zIndex: 999,
        }),
        menuList: (base) => ({
            ...base,
            background: "#222222",
        }),
        option: (base, state) => ({
            ...base,
            color: "white",
            background: state.isFocused ? "#545454" : "#222222",
            "&:hover": {
                background: "#545454",
            },
        }),
    };

    // Values of category selection
    const options = [
        { value: "general", label: "General" },
        { value: "gossip", label: "Gossip" },
        { value: "course", label: "Courses&Profs" },
        { value: "job", label: "Job Connections" },
    ];

    // Category of the new thread
    const [category, setCategory] = useState("");
    // Title of the new thread
    const [title, setTitle] = useState("");
    // Content of the new thread
    const [content, setContent] = useState("");

    const handleSumbit = () => {
        // Input check
        if (category === "" || title === "" || content === "") {
            setSnackbarInfo({
                severity: "error",
                content: "Insufficient input. Please try again.",
            });
            setAlertOpen(true);
            return;
        }

        if (title.length > 200) {
            setSnackbarInfo({
                severity: "error",
                content: "Title is too long. Please try again.",
            });
            setAlertOpen(true);
            return;
        }

        const newThread = {
            author: user._id,
            category: category.value,
            title: title,
        };

        const newReply = {
            author: user._id,
            content: DOMPurify.sanitize(content),
        };

        axios // Create new thread here
            .post("/thread", newThread, { withCredentials: true })
            .then((res) => {
                // Insert reply after creating a new thread object
                axios
                    .post(`/reply/${res.data._id}`, newReply, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        // Success message
                        setSnackbarInfo({
                            severity: "success",
                            content: "New thread created.",
                        });
                        setAlertOpen(true);
                        console.log(res);
                        // Auto refresh after created new thread
                        if (currentCategory === category.value) {
                            dispatch(refreshThreadStart());
                            axios
                                .get(`/thread/category/${currentCategory}`)
                                .then((response) => {
                                    setTimeout(() => {
                                        dispatch(setThread(response.data));
                                        dispatch(refreshThreadEnd());
                                    }, 500);
                                });
                        } else {
                            navigate(`category/${category.value}`);
                            dispatch(selectCategory(category.value));
                        }
                        // Reset variables
                        setTitle("");
                        setCategory("");
                        setContent("");
                        setSubmitted(true);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            })
            .catch((err) => {
                console.log(err.response);
            });
        // Close the window at the end
        dispatch(toggleCreateThread());
    };

    // For resetting tinymce
    useEffect(() => {
        if (sumbitted === true) {
            setSubmitted(false);
        }
    }, [sumbitted]);

    // For snack bar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <div>
            <div
                className="create_thread"
                style={{
                    display: style.display,
                }}
            >
                <div
                    className="create_thread_overlay"
                    onClick={() => dispatch(toggleCreateThread())}
                ></div>
                <div className="create_thread_window">
                    <div className="create_thread_window_header">
                        <div>
                            <p>Creating new thread in: </p>
                            <Select
                                styles={customSelectStyles}
                                options={options}
                                value={category}
                                onChange={(option) => setCategory(option)}
                            />
                        </div>

                        <div
                            className="create_thread_window_exit_button"
                            onClick={() => dispatch(toggleCreateThread())}
                        >
                            <ClearRoundedIcon />
                        </div>
                    </div>
                    <div className="create_thread_window_title">
                        <input
                            className="title"
                            placeholder="Title of the thread (Not longer than 200 characters)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className="create_thread_window_content">
                        {/* PreviewThread is hidden in default. Appear when toggled */}
                        <PreviewThread title={title} content={content} />
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
                                    width: "98%",
                                    plugins: [
                                        "advlist autolink lists link image",
                                        "charmap print preview anchor help",
                                        "searchreplace visualblocks code",
                                        "insertdatetime media table paste wordcount",
                                    ],
                                    toolbar:
                                        " fontsizeselect | forecolor backcolor | bold italic underline strikethrough| alignleft aligncenter alignright | bullist numlist | image link | help",
                                }}
                                onEditorChange={(context, editor) =>
                                    setContent(context)
                                }
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="create_thread_window_footer">
                        <div className="footer_buttons">
                            <div
                                className="cancel_button"
                                onClick={() => dispatch(toggleCreateThread())}
                            >
                                <p>Cancel</p>
                            </div>
                            <div
                                className="preview_thread_button"
                                onClick={() => dispatch(togglePreviewThread())}
                            >
                                <p>Preview</p>
                            </div>
                            <div
                                className="sumbit_thread"
                                onClick={() => handleSumbit()}
                            >
                                <p>Submit</p>
                            </div>
                        </div>
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

export default CreateThread;
