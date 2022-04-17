import "./App.css";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import BottomBar from "./BottomBar";
import ThreadList from "./ThreadList";
import CreateThread from "./CreateThread";
import LoginMenu from "./LoginMenu";
import { useState, useEffect } from "react";
import ReplyList from "./ReplyList";

function App() {
    return (
        <div className="app">
            <div className="app_body">
                <NavBar />
                <SideMenu /> {/* Hidden. Appear when toggled */}
                <CreateThread /> {/* Hidden. Appear when toggled */}
                <LoginMenu /> {/* Hidden. Appear when toggled */}
                <div className="main_panel">
                    <ThreadList />
                    <ReplyList />
                </div>
                <BottomBar />
            </div>
        </div>
    );
}

export default App;
