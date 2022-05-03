import React, { useState } from "react";
import "./CreateReply.css";
import { useSelector, useDispatch } from "react-redux";
import { createReplyClose } from "./actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/skins/ui/1.0/skin.css";
import "tinymce/skins/ui/1.0/content.inline.css";
import DOMPurify from "dompurify";
import axios from "./axios";

function CreateReply() {
    const selectThread = useSelector((state) => state.selectThread);
    const style = useSelector((state) => state.toggleCreateReply);
    const dispatch = useDispatch();

    // Content of the new reply
    const [content, setContent] = useState("");

    const handleSumbit = () => {
        // Todo: let user preview the reply
        const newReply = {
            author: "625107c17fddad483649749f", // Will change
            content: DOMPurify.sanitize(content),
        };
        // Todo: check input before create reply
        axios
            .post(`/reply/${selectThread.currentThread._id}`, newReply)
            .then((res) =>
                console.log("New reply created with id:", res.data._id)
            )
            .catch((err) => {
                console.log(err.response);
            });
        dispatch(createReplyClose());
        // Todo: Clean up create new thread
    };

    return (
        <div
            className="create_reply"
            style={{
                display: style.display,
            }}
        >
            <div className="create_reply_header">
                <p>Replying:</p>
                <input value={selectThread.currentThread.title} disabled />
                <div
                    className="create_reply_exit_button"
                    onClick={() => dispatch(createReplyClose())}
                >
                    <ClearRoundedIcon />
                </div>
            </div>
            <div className="create_reply_body">
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
                            "formatselect | fontsizeselect | forecolor | bold italic underline strikethrough| alignleft aligncenter alignright | bullist numlist outdent indent | help",
                    }}
                    onEditorChange={(context, editor) => setContent(context)}
                />
            </div>
            <div className="create_reply_footer">
                <div className="sumbit_reply" onClick={() => handleSumbit()}>
                    <p>Submit</p>
                </div>
            </div>
        </div>
    );
}

export default CreateReply;
