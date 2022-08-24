import React, { useState, useEffect } from "react";
import "./AccountMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { loginMenuClose, setUser } from "../actions";
import axios from "../axios";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import DOMPurify from "dompurify";

function AccountMenu() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const style = useSelector((state) => state.loginWindowToggle);
    const user = useSelector((state) => state.user);
    const [nameChanged, setNameChanged] = useState(false);

    useEffect(() => {
        setNameChanged(user?.nameChanged);
    }, [user]);

    // Snackbar status
    const [alertOpen, setAlertOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        severity: "error",
        content: "",
    });

    // For snack bar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const handleLogOut = (e) => {
        axios.get("/logout").then((response) => {
            dispatch(setUser(null));
            document.getElementById("google_sign_in").hidden = false;
            // Refresh to homepage
            navigate(``);
            window.location.reload(true);
        });
    };

    const handleChangeDisplayname = (e) => {
        let newName = prompt(
            "Please enter your new display name (Not longer than 20 Characters). WARNING: you can only change your display name ONCE."
        );

        if (newName === null || newName === "") {
            return;
        }

        if (newName?.length > 20) {
            setSnackbarInfo({
                severity: "error",
                content: "Length limit exceeded. Please try again",
            });
            setAlertOpen(true);
            return;
        }

        axios
            .post(
                `/user/displayname/?email=${
                    user.email
                }&newName=${DOMPurify.sanitize(newName)}`,
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                // Success message
                setSnackbarInfo({
                    severity: "success",
                    content: "Display name Changed.",
                });
                setAlertOpen(true);
                setNameChanged(true);
                // Refresh to homepage
                navigate(``);
                window.location.reload(true);
            })
            .catch((error) => {
                // Error message
                setSnackbarInfo({
                    severity: "error",
                    content: "The name already exists",
                });
                setAlertOpen(true);
            });
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
                        {!nameChanged && (
                            <div
                                className="change_displayname_button"
                                onClick={(e) => handleChangeDisplayname(e)}
                            >
                                Change display name
                            </div>
                        )}
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
                <div className="account_menu_footer">
                    <p>
                        By logging in you agree with our terms, policies and
                        rules.
                    </p>
                </div>
            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={2500}
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

export default AccountMenu;
