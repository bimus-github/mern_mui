import React, { useEffect } from "react";
import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar,
  AppBar,
  Link,
  Button,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  SpeakerNotes,
} from "@material-ui/icons";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { pushUser } from "../store/features/userSlice";
import { deleteAllNotes } from "../store/features/noteSlice";

const drawerWidth = 240;

export default function Layout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Public notes",
      icon: <SpeakerNotes color="secondary" />,
      path: "/publicNotes",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(pushUser(null));
    dispatch(deleteAllNotes());
  };

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(pushUser(user));
    }
  }, [dispatch, user]);

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        className={
          classes.appBar +
          { width: user !== null ? `calc(100% - ${drawerWidth}px)` : "100%" }
        }
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "dd-LL-yyyy")}
          </Typography>

          {user ? (
            <>
              <Button
                size="small"
                variant="outlined"
                style={{ marginRight: "20px", backgroundColor: "white" }}
                onClick={handleLogout}
              >
                Log out
              </Button>
              <Typography>{user?.email}</Typography>
              <Avatar className={classes.avatar} src={user?.imgUrl} />
            </>
          ) : (
            <Stack direction={"row"} spacing="10px">
              <Link
                href="/login"
                color="inherit"
                underline={location.pathname === "/login" ? "always" : "hover"}
              >
                Login
              </Link>
              <Link
                href="/signup"
                color="inherit"
                underline={location.pathname === "/signup" ? "always" : "hover"}
              >
                Signup
              </Link>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      {user && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div>
            <Typography variant="h5" className={classes.title}>
              Notes
            </Typography>
          </div>

          {/* links/list section */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});
