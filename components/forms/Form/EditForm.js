import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MoreIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PaletteIcon from "@material-ui/icons/Palette";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import QuestionsTab from "./QuestionsTab";
import ResponseTab from "../Response/ResponseTab";
import formService from "../../../files/apis";
import { useSession } from "next-auth/client";
import UserView from "../Responding/UserView";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    justifySelf: "center",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    alignContent: "space-between",
    alignItems: "center",
  },
}));

function EditForm(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(props.userid);
  const [formID, setFormID] = React.useState("");

  const [formDeatils, setFormDetails] = React.useState({});
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  React.useEffect(() => {
    console.log(props);
    // setUser(props.userid);
  }, []);

  const clipToClipboard = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/s/" + formDeatils._id
    );
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenOfAlert(false);
  };

  function sendForm() {
    handleClickOpen();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    var formId = props.formId;
    if (formId !== undefined) {
      setFormID(formId);
      formService.getForm(formId).then(
        (data) => {
          // console.log(data);
          setFormDetails(data);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  }, [props.formId]);
  console.log("formDetails", formDeatils, "user", user);
  return (
    <div>
      {formDeatils.createdBy === user ? (
        <div>
          <div className={classes.root}>
            <Paper>
              <div className="inline justify-between mr-4 ml-2 sm:flex">
                <div className="flex justify-center">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    aria-label="Rohit Saini's form"
                    style={{ color: "#140078" }}
                  >
                    <img src="/forms.png" className="w-10" />
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    style={{ marginTop: "8.5px", color: "black" }}
                  >
                    {formDeatils.name}
                  </Typography>
                </div>

                <div>
                  <IconButton aria-label="search" onClick={sendForm}>
                    <SendIcon />
                  </IconButton>
                  <IconButton aria-label="search">
                    <PaletteIcon />
                  </IconButton>
                  <IconButton aria-label="search">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton aria-label="search">
                    <SettingsIcon />
                  </IconButton>

                  <IconButton aria-label="display more actions" edge="end">
                    <MoreIcon />
                  </IconButton>
                  <IconButton aria-label="display more actions" edge="end">
                    <img
                      name="apps"
                      loading="lazy"
                      className="cursor-pointer h-8 w-8 rounded-full ml-2"
                      src={props.userimage}
                      size="2xl"
                    />
                  </IconButton>
                </div>
              </div>
              <Tabs
                className={classes.title}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Questions" />
                <Tab label="Responses" />
              </Tabs>
            </Paper>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Copy and share link."}
              </DialogTitle>
              <DialogContent>
                <Paper className={classes.paper}>
                  <Grid
                    container
                    alignContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="body1">
                        {window.location.origin + "/s/" + formDeatils._id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        className={classes.button}
                        aria-label="Add"
                        size="medium"
                        onClick={clipToClipboard}
                      >
                        <FilterNoneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>

                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseOfAlert}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>

          <>
            <TabPanel value={value} index={0}>
              <QuestionsTab formData={formDeatils} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponseTab formData={formDeatils} formId={formID} />
            </TabPanel>
          </>
        </div>
      ) : (
        <UserView user={user} formId={formID} />
        // <p>
        //   Dear {user},<br />
        //   you do not have the access of this form: Contact{" "}
        //   {formDeatils.createdBy} for the access
        // </p>
      )}
    </div>
  );
}

export default EditForm;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
