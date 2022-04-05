import "./App.css";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import BottomBar from "./BottomBar";
import ThreadBlock from "./ThreadBlock";
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
                    <div className="thread_bar">
                        <ThreadBlock
                            author={"Squall"}
                            time={"1h"}
                            title={
                                "I am the title of the thread. I am the title of the thread. I am the title of the thread. I am the title of the thread.I am the title of the thread."
                            }
                            score={+2}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Author2"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={+4}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Admin"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={-40}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Bruno_Fernandes"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={+120}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Author2"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={+244}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Author2"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={+0}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Author2"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={+24}
                            id={"topic id"}
                        />
                        <ThreadBlock
                            author={"Author2"}
                            time={"2m"}
                            title={
                                "I am title. I am title. I am title. I am title."
                            }
                            score={-123}
                            id={"topic id"}
                        />
                    </div>
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
