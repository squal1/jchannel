import React from "react";
import "./SideMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { sideMenuClose } from "./actions";

function SideMenu() {
    const style = useSelector((state) => state.sideMenuToggle);
    const dispatch = useDispatch();

    return (
        <div className="side_menu_layer">
            <div
                className="side_menu_overlay"
                style={{
                    opacity: style.opacity,
                    pointerEvents: style.pointerEvents,
                }}
                onClick={() => dispatch(sideMenuClose())}
            ></div>
            <div
                className="side_menu"
                style={{
                    left: style.left,
                    backgroundColor: style.backgroundColor,
                    opacity: style.opacity,
                    visibility: style.visibility,
                }}
            >
                THis is side menu THis is side menu THis is side menu THis is
                side menu
            </div>
        </div>
    );
}

export default SideMenu;
