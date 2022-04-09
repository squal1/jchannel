import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createThreadClose } from "./actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/skins/ui/1.0/skin.css";
import "tinymce/skins/ui/1.0/content.inline.css";
import "./CreateThread.css";

function CreateThread() {
    /* For toggling */
    const style = useSelector((state) => state.createThreadToggle);
    const dispatch = useDispatch();

    /* https://www.tiny.cloud/ */
    /* https://www.google.com/search?q=tinymce+editor+get+html+content&client=firefox-b-1-d&ei=iPVDYrs189j0A4mKoNAD&oq=tinymce+editor+get&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwA0oECEEYAEoECEYYAFDQA1iyBWCGFGgBcAF4AIABWYgB-AGSAQEzmAEAoAEByAEIwAEB&sclient=gws-wiz */

    /* https://stackoverflow.com/questions/67967370/how-to-use-option-value-in-react-select */
    return (
        <div
            className="create_thread"
            style={{
                display: style.display,
            }}
        >
            <div
                className="create_thread_overlay"
                onClick={() => dispatch(createThreadClose())}
            ></div>
            <div className="create_thread_window">
                <div className="create_thread_window_header">
                    <div>
                        <p>Creating new thread in: </p>
                        {/*<Select className="category_choose" />*/}
                    </div>

                    <div
                        className="create_thread_window_exit_button"
                        onClick={() => dispatch(createThreadClose())}
                    >
                        <ClearRoundedIcon />
                    </div>
                </div>
                <div className="create_thread_window_title">
                    <input
                        className="title"
                        placeholder="Title of the thread"
                    ></input>
                </div>
                <div className="create_thread_window_content">
                    <Editor
                        apiKey="n6yu8t20ieccyzq70g4q8hqld8siccaoj0fa11nqkdj4kdds"
                        initialValue="<p>This is the initial content of the editor.</p>"
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
                                "formatselect | fontsizeselect | forecolor | bold italic underline strikethrough| \
                                    alignleft aligncenter alignright | \
                                    bullist numlist outdent indent | help",
                        }}
                    />
                </div>
                <div className="create_thread_window_footer">
                    <div className="footer_buttons">
                        <div
                            className="cancel_button"
                            onClick={() => dispatch(createThreadClose())}
                        >
                            <p>Cancel</p>
                        </div>
                        <div className="sumbit_button">
                            <p>Submit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateThread;
