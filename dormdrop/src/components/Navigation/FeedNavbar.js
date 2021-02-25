import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DormDropLogo from "../../images/logo.png";
import Drawer from "@material-ui/core/Drawer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: { background: "white" },
  logo: {
    height: 60,
    objectFit: "contain",
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 250,
  },
}));

const LogoContainer = styled.div``;

const ProfileIconContainer = styled.div`
  color: green;
`;

const Placeholder = styled.div`
  width: 350px;
`;

export default function FeedNavbar() {
  const history = useHistory();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(anchorEl);

  const toggleDrawer = (event) => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToHome = () => {
    history.push("/");
  };

  return (
    <div className={classes.root} onClick={toggleDrawer}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <LogoContainer className={classes.title}>
            <img
              src={DormDropLogo}
              alt={"DormDrop Logo"}
              className={classes.logo}
              onClick={redirectToHome}
            />
          </LogoContainer>
          <ProfileIconContainer>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={profileMenuOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            <IconButton
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </ProfileIconContainer>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"right"} open={drawerOpen} className={classes.drawer}>
        <Placeholder />
      </Drawer>
    </div>
  );
}
