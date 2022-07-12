import "./App.css";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import SideMenu from "../SideMenu";
import ThreadList from "../ThreadList";
import CreateThread from "../CreateThread";
import CreateReply from "../CreateReply";
import AccountMenu from "../AccountMenu";
import ReplyList from "../ReplyList";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "../axios";

function App() {
    const dispatch = useDispatch();

    // Callback after login
    const handleCallbackResponse = (response) => {
        console.log(response.credential);
        axios
            .post(
                "/login",
                { jwtToken: response.credential },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response);
                dispatch(setUser(response.data));
            });
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        document.getElementById("google_sign_in").hidden = true;
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "1094115480814-5vcn06vn4ifb3iafhnbhitpeci9emkm2.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById("google_sign_in"),
            { theme: "outline", size: "large" }
        );

        // Login automatically
        axios.get("/user", { withCredentials: true }).then((response) => {
            console.log(response.data.jwtToken);
            if (response.data.jwtToken) {
                axios
                    .post(
                        "/login",
                        { jwtToken: response.data.jwtToken },
                        { withCredentials: true }
                    )
                    .then((response) => {
                        console.log(response);
                        dispatch(setUser(response.data));
                    });
                document.getElementById("google_sign_in").hidden = true;
            }
        });
    }, []);

    return (
        <div className="app">
            <div className="app_body">
                <NavBar />
                <AccountMenu /> {/* Hidden. Appear when toggled */}
                <SideMenu /> {/* Hidden. Appear when toggled */}
                <CreateThread /> {/* Hidden. Appear when toggled */}
                <CreateReply /> {/* Hidden. Appear when toggled */}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Navigate to="/category/general" replace />}
                    />
                    <Route
                        path="/category/:category"
                        element={
                            <div className="main_panel">
                                <ThreadList />
                                <ReplyList />
                            </div>
                        }
                    />
                    <Route
                        path="/thread/:_id"
                        element={
                            <div className="main_panel">
                                <ThreadList />
                                <ReplyList />
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
