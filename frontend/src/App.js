import "./App.css";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import BottomBar from "./BottomBar";
import ThreadBar from "./ThreadBar";
import ThreadReply from "./ThreadReply";
import CreateThread from "./CreateThread";
import LoginMenu from "./LoginMenu";
import { useState, useEffect } from "react";

function App() {
    return (
        <div className="app">
            <div className="app_body">
                <NavBar />
                <SideMenu /> {/* Hidden. Appear when toggled */}
                <CreateThread /> {/* Hidden. Appear when toggled */}
                <LoginMenu /> {/* Hidden. Appear when toggled */}
                <div className="main_panel">
                    <ThreadBar />
                    <div className="thread_content">
                        <ThreadReply />
                        <ThreadReply />
                        <ThreadReply />
                        <ThreadReply />
                        <ThreadReply />
                        <div className="end_of_thread_content">&nbsp;</div>
                    </div>
                </div>
                <BottomBar />
            </div>
        </div>
    );
}

export default App;
