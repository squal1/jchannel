import "./App.css";
import ThreadBlock from "./ThreadBlock";
import ThreadReply from "./ThreadReply";
import { useState, useEffect } from "react";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

function App() {
    const [threads, setThreads] = useState([]);
    const [sideMenuStyle, setSideMenuStyle] = useState({
        opacity: "0",
        left: "-300px",
        pointerEvents: "none",
        backgroundColor: "#000000",
        visibility: "hidden",
    });

    const sideMenuOpen = () => {
        setSideMenuStyle({
            opacity: "1",
            left: "0px",
            pointerEvents: "auto",
            backgroundColor: "#222222",
            visibility: "visible",
        });
    };

    const sideMenuClose = () => {
        setSideMenuStyle({
            opacity: "0",
            left: "-300px",
            pointerEvents: "none",
            backgroundColor: "#000000",
            visibility: "hidden",
        });
    };

    return (
        <div className="app">
            <div className="app_body">
                <nav className="nav_bar">
                    <div className="nav_bar_left">
                        <div
                            className="nav_bar_left_menu_button"
                            onClick={sideMenuOpen}
                        >
                            <MenuIcon className="nav_bar_left_menu_icon" />
                        </div>

                        <div className="category_name">Category name</div>

                        <div className="nav_bar_left_f5_button">
                            <CachedRoundedIcon />
                        </div>
                        <div className="nav_bar_left_create_topic_button">
                            <AddIcon />
                        </div>
                    </div>
                    <div className="nav_bar_right">
                        <div className="nav_bar_right_thread_topic">
                            I am the title of the topic. I am the title of the
                            topic. I am the title of the topic. I am the title
                            of the topic. I am the title of the topic. I am the
                            title of the topic.
                        </div>
                    </div>
                </nav>

                <div className="side_menu_layer">
                    <div
                        className="side_menu_overlay"
                        style={{
                            opacity: sideMenuStyle.opacity,
                            pointerEvents: sideMenuStyle.pointerEvents,
                        }}
                        onClick={sideMenuClose}
                    ></div>
                    <div
                        className="side_menu"
                        style={{
                            left: sideMenuStyle.left,
                            backgroundColor: sideMenuStyle.backgroundColor,
                            opacity: sideMenuStyle.opacity,
                            visibility: sideMenuStyle.visibility,
                        }}
                    >
                        THis is side menu THis is side menu THis is side menu
                        THis is side menu
                    </div>
                </div>

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
                    </div>
                </div>
                <div className="bottom_bar">I am bottom bar</div>
            </div>
        </div>
    );
}

export default App;
