import React, { useEffect } from "react";
import "./ThreadBar.css";
import ThreadBlock from "./ThreadBlock";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function ThreadBar() {
    const category = useSelector((state) => state.changeCategory);

    useEffect(() => {
        console.log("Load default category");
    }, []);

    useEffect(() => {
        console.log("Category changed. Reload thread bar");
    }, [category]);

    return (
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
                title={"I am title. I am title. I am title. I am title."}
                score={+4}
                id={"topic id"}
            />
            <ThreadBlock
                author={"Admin"}
                time={"2m"}
                title={"I am title. I am title. I am title. I am title."}
                score={-40}
                id={"topic id"}
            />
            <ThreadBlock
                author={"Bruno_Fernandes"}
                time={"2m"}
                title={"I am title. I am title. I am title. I am title."}
                score={+120}
                id={"topic id"}
            />
            <ThreadBlock
                author={"Author2"}
                time={"2m"}
                title={"I am title. I am title. I am title. I am title."}
                score={+244}
                id={"topic id"}
            />
            <ThreadBlock
                author={"Author2"}
                time={"2m"}
                title={"I am title. I am title. I am title. I am title."}
                score={+0}
                id={"topic id"}
            />
            <ThreadBlock
                author={"Author2"}
                time={"2m"}
                title={"I am title. I am title. I am title. I am title."}
                score={+24}
                id={"topic id"}
            />
            <ThreadBlock
                author={"Author2"}
                time={"2m"}
                title={"I am title. I am title. I am title. I am title."}
                score={-123}
                id={"topic id"}
            />
        </div>
    );
}

export default ThreadBar;
