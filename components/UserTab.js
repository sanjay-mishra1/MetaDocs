import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import receiveIcon from "../img/receive.svg";
// import uploadIcon from "../img/upload.svg";
// import icon from "../img/icon.png";
import withWidth from "@material-ui/core/withWidth";
import Image from "next/image";
import { fileTypes } from "../files/Lists";
const uid = "name";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: "auto",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function UseTab(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.showTabs);
  const [selected, setselected] = React.useState(0);
  const handleDrawerOpen = () => {
    if (props.width !== "xs") setOpen(true);
  };
  React.useEffect(() => {
    if (props.showTabs) {
      handleDrawerOpen();
      props.setShowTabsFn(false);
    }
    console.log("showtabs", props.showTabs);
  }, [props.showTabs]);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handlePageClick = (index) => {
    setselected(index);
    props.setFileType(fileTypes[index]);
  };
  // const openDocsPage = () => {

  // };
  // const handleShowUpload = () => {
  //   // props.setPage("upload");
  //   setselected(1);
  // };
  const attr = {
    height: "33",
    width: "33",
  };
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <ListItem style={{ marginTop: 15 }}>
          <ListItemIcon>
            <img
              name="user"
              loading="lazy"
              className="cursor-pointer h-8 w-8 rounded-full ml-2"
              src={props.userCreds.image}
              size="2xl"
            />
          </ListItemIcon>
          {open && (
            <ListItemText
              primary={props.userCreds.name}
              style={{ color: "rgb(236 158 153)" }}
            />
          )}
        </ListItem>
        <Divider />

        <List>
          {fileTypes.map((item, index) => (
            <ListItem
              button
              key={index}
              index={index}
              onClick={() => handlePageClick(index)}
              selected={selected === index}
            >
              <ListItemIcon>
                <Image
                  width={attr.width}
                  height={attr.height}
                  src={item.image}
                  className="tab-icon"
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}

          {/* <ListItem
            button
            index={1}
            onClick={handleShowUpload}
            selected={selected === 1}
          >
            <ListItemIcon>
              <Image
                width={attr.width}
                height={attr.height}
                src="/workbook.png"
                className="tab-icon"
              />
            </ListItemIcon>
            <ListItemText primary={"Workbook"} />
          </ListItem>

          <ListItem
            button
            index={1}
            onClick={handleShowUpload}
            selected={selected === 1}
          >
            <ListItemIcon>
              <Image
                width={attr.width}
                height={attr.height}
                src="/forms.png"
                className="tab-icon"
              />
            </ListItemIcon>
            <ListItemText primary={"Forms"} />
          </ListItem>
          <ListItem
            button
            index={2}
            onClick={handleShowUpload}
            selected={selected === 2}
          >
            <ListItemIcon>
              <Image
                width={attr.width}
                height={attr.height}
                src="/folder.png"
                className="tab-icon"
              />
            </ListItemIcon>
            <ListItemText primary={"Files"} />
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  );
}
export default withWidth()(UseTab);
