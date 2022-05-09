import "./App.css";
import { useEffect } from "react";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import BottomBar from "./BottomBar";
import ThreadList from "./ThreadList";
import CreateThread from "./CreateThread";
import CreateReply from "./CreateReply";
import LoginMenu from "./LoginMenu";
import ReplyList from "./ReplyList";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";

function App() {
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/category/general");
    }, []);

    return (
        <div className="app">
            <div className="app_body">
                <NavBar />
                <LoginMenu /> {/* Hidden. Appear when toggled */}
                <SideMenu /> {/* Hidden. Appear when toggled */}
                <CreateThread /> {/* Hidden. Appear when toggled */}
                <CreateReply /> {/* Hidden. Appear when toggled */}
                <Routes>
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
                <BottomBar />
            </div>
        </div>
    );
}

export default App;
