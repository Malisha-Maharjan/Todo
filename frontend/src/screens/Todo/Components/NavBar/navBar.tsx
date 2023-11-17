import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { animate, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../../../data/sideBar";
import styles from "./navBar.module.css";

// import { TodoGrid } from "./todoList";
export const NavBar = () => {
  const [isOpen, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log({ isOpen });

  const onAnimateClick = () => {
    animate("#box", { width: isOpen ? 38 : 200 });
    setOpen(!isOpen);
  };

  return (
    <div
      style={{ backgroundColor: "grey", height: "100vh", position: "relative" }}
    >
      <motion.div
        id="box"
        style={{ width: 200, height: "100vh", backgroundColor: "#f2f6ff" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={onAnimateClick}>
            <MenuIcon />
          </IconButton>
        </div>

        {SidebarData.map((data, index) => (
          <div>
            <NavLink
              to={data.path}
              className={`${styles.content} ${
                selectedIndex === index ? styles.selected : ""
              }`}
              onClick={() => setSelectedIndex(index)}
              key={index}
            >
              <IconButton>{data.icon}</IconButton>
              <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                {data.title}
              </div>
            </NavLink>
          </div>
        ))}
        <NavLink to="/" className={styles.content}>
          <IconButton
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              // width: "100%",
            }}
          >
            <LogoutIcon />
          </IconButton>
        </NavLink>
      </motion.div>
    </div>
  );
};
