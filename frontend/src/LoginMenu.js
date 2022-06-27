import React from "react";
import "./LoginMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { loginMenuClose, setUser } from "./actions";
import axios from "./axios";

function LoginMenu() {
    const dispatch = useDispatch();
    const style = useSelector((state) => state.loginWindowToggle);
    const user = useSelector((state) => state.user);

    const handleLogOut = (e) => {
        axios.get("/logout").then((response) => {
            console.log(response);
        });
        dispatch(setUser(null));
        document.getElementById("google_sign_in").hidden = false;
    };

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
                <div id="google_sign_in"></div>

                {user && (
                    <div>
                        <p>{user.email}</p>
                        <p>{user.name}</p>
                        <p>{user.displayName}</p>
                        <button onClick={(e) => handleLogOut(e)}>
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginMenu;
