import AppsIcon from "@material-ui/icons/Apps";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import FastfoodIcon from "@material-ui/icons/Fastfood";

export const sidebarItems = [
  { title: "Dashboard", icon: <AppsIcon />, path: "/admin/dashboard" },
  { title: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
  { title: "Site Home", icon: <HomeIcon />, path: "/" },
  { title: "Delivery Feed", icon: <FastfoodIcon />, path: "/feed" },
];
