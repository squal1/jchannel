import React from "react";
import "./LoginMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { loginMenuClose } from "./actions";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function LoginMenu() {
    /* Redux */
    const style = useSelector((state) => state.loginWindowToggle);
    const dispatch = useDispatch();

    return (
        <div
            className="login"
            style={{
                display: style.display,
            }}
        >
            <div
                className="login_overlay"
                onClick={() => dispatch(loginMenuClose())}
            ></div>
            <div className="login_window">
                <div className="login_window_header">
                    <p>Login</p>
                </div>
            </div>
        </div>
    );
}

export default LoginMenu;
