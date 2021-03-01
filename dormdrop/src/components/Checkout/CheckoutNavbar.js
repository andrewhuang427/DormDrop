import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DormDropLogo from "../../images/logo.png";
import Badge from "@material-ui/core/Badge";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { signOut } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: { background: "white" },
  toolbar: { maxWidth: 1400 },
  logo: {
    height: 60,
    objectFit: "contain",
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const LogoContainer = styled.div``;

const ProfileIconContainer = styled.div`
  color: grey;
`;

const Placeholder = styled.div`
  width: 400px;
  color: black;
`;

const SidebarHeading = styled.div`
  text-align: center;
`;

export default function CheckoutNavbar({ removeFromCart, cart }) {
  const history = useHistory();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(anchorEl);

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
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <LogoContainer className={classes.title}>
            <img
              style={{ cursor: "pointer" }}
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
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
          </ProfileIconContainer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
