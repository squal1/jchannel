import React, { useState } from "react";
import "./CreateThread.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateThread, togglePreviewThread } from "./actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import "tinymce/skins/ui/1.0/skin.css";
import "tinymce/skins/ui/1.0/content.inline.css";
import axios from "./axios";
import DOMPurify from "dompurify";
import PreviewThread from "./PreviewThread";
import { Snackbar, Alert } from "@mui/material";

function CreateThread() {
    // For toggling
    const style = useSelector((state) => state.toggleCreateThread);
    const dispatch = useDispatch();

    // Snackbar status
    const [alertOpen, setAlertOpen] = useState(false);

    // Styling react-select
    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: 200,
            color: "white",
            background: "#222222",
            borderRadius: "5px",
            borderColor: state.isFocused ? "#f8b77b" : "#505050",
            boxShadow: state.isFocused ? null : null,
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
            setAlertOpen(true);
            return;
        }

        const newThread = {
            author: "625107c17fddad483649749f", // Will change
            category: category.value,
            title: title,
        };

        const newReply = {
            author: "625107c17fddad483649749f", // Will change
            content: DOMPurify.sanitize(content),
        };

        axios // Create new thread here
            .post("/thread", newThread)
            .then((res) => {
                // Insert reply after creating a new thread object
                axios
                    .post(`/reply/${res.data._id}`, newReply)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            })
            .catch((err) => {
                console.log(err.response);
            });
        dispatch(toggleCreateThread());
        // Todo: Clean up create new thread
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    return (
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
                            options={options}
                            styles={customStyles}
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
                        placeholder="Title of the thread"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="create_thread_window_content">
                    {/* Hidden. Appear when toggled */}
                    <PreviewThread title={title} content={content} />
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
                                "formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough| alignleft aligncenter alignright | bullist numlist | outdent indent | help",
                        }}
                        onEditorChange={(context, editor) =>
                            setContent(context)
                        }
                    />
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
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={1500}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        Insufficient Input. Please try again.
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default CreateThread;
