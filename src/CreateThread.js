import React from "react";
import "./CreateThread.css";
import { useSelector, useDispatch } from "react-redux";
import { createThreadClose } from "./actions";

function CreateThread() {
    /* For toggling */
    const style = useSelector((state) => state.createThreadToggle);
    const dispatch = useDispatch();

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
            >
                <div className="create_thread_window">
                    This is create thread
                </div>
            </div>
        </div>
    );
}

export default CreateThread;
