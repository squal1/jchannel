import React from "react";
import "./AccountMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { loginMenuClose, setUser } from "../actions";
import axios from "../axios";

function AccountMenu() {
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
                {user ? (
                    <div>
                        <div className="user_profile">
                            <p>{user.email}</p>
                            <p>{user.name}</p>
                            <p>{user.displayName}</p>
                        </div>
                        <button onClick={(e) => handleLogOut(e)}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="login_window_header">
                        <p>Login with your Jessup email</p>
                    </div>
                )}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div id="google_sign_in"></div>
                </div>
            </div>
        </div>
    );
}

export default AccountMenu;
