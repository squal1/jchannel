import React from "react";
import "./CreateThread.css";
import { useSelector, useDispatch } from "react-redux";
import { createThreadClose } from "./actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function CreateThread() {
    /* For toggling */
    const style = useSelector((state) => state.createThreadToggle);
    const dispatch = useDispatch();

    /* https://www.tiny.cloud/ */
    /* https://www.google.com/search?q=tinymce+editor+get+html+content&client=firefox-b-1-d&ei=iPVDYrs189j0A4mKoNAD&oq=tinymce+editor+get&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwA0oECEEYAEoECEYYAFDQA1iyBWCGFGgBcAF4AIABWYgB-AGSAQEzmAEAoAEByAEIwAEB&sclient=gws-wiz */

    return (
        <div
            className="create_thread"
            style={{
                display: style.display,
            }}
        >
            <div className="create_thread_overlay">
                <div className="create_thread_window">
                    <div className="create_thread_window_header">
                        <p>Creating new thread...</p>
                        <div
                            className="exit_button"
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
                        123
                        {/* Third party editor here */}
                    </div>
                    <div className="create_thread_window_footer">
                        <div className="category_choosing">
                            <p>Post to:</p>
                            <select></select>
                        </div>
                        <div className="footer_buttons">
                            <div className="cancel_button">Cancel</div>
                            <div className="sumbit_button">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateThread;
