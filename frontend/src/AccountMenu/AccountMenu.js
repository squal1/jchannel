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
                            <div className="user_profile_header">Your Info</div>
                            <div className="user_profile_body">
                                <p>Email: {user.email}</p>
                                <p>Display name: {user.displayName}</p>
                            </div>
                        </div>
                        <div className="change_displayname_button">
                            Change display name
                        </div>
                        <div
                            className="logout_button"
                            onClick={(e) => handleLogOut(e)}
                        >
                            Log Out
                        </div>
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
