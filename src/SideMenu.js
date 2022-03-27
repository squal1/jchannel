import React from "react";
import "./SideMenu.css";

function SideMenu({ sideMenuStyle, sideMenuClose }) {
    return (
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
                THis is side menu THis is side menu THis is side menu THis is
                side menu
            </div>
        </div>
    );
}

export default SideMenu;
