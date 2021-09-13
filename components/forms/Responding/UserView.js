import React from "react";

import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

import formService from "../../../files/apis";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import FormFooter from "./FormFooter";

const useStyles = makeStyles((theme) => ({}));

function UserView(props) {
  const classes = useStyles();

  const [userId, setUserId] = React.useState("");
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState({});

  const [optionValue, setOptionValue] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    if (props.user) {
      setUserId(props.user);
    }
  }, []);

  const handleRadioChange = (questionId, optionId) => {
    console.log("radio clicked ", optionId, questionId);
    responseData[questionId] = optionId;
  };

  React.useEffect(() => {
    var formId = props.formId;
    console.log(formId);

    formService.getForm(formId).then(
      (data) => {
        console.log(data);

        setFormData(data);
        setQuestions(data.questions);
        try {
          var initialResponse = {};
          data.questions.forEach((option) => {
            initialResponse[option.id] = "";
          });
          setResponseData(initialResponse);
        } catch (error) {}
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
  }, [props.formId]);

  function submitResponse() {
    var submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };
    console.log(submissionData);
    // return;
    formService.submitResponse(submissionData).then(
      (data2) => {
        setIsSubmitted(true);
        console.log(data2);
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

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <AppBar position="static" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{}}>
              Velocity Forms
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formData.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!isSubmitted ? (
              <div>
                <Grid>
                  {questions.map((ques, i) => (
                    <div key={ques.id}>
                      <br></br>
                      <Paper>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {ques.questionText}
                            </Typography>

                            {ques.questionImage !== "" ? (
                              <div>
                                <img
                                  src={ques.questionImage}
                                  width="80%"
                                  height="auto"
                                />
                                <br></br>
                                <br></br>
                              </div>
                            ) : (
                              ""
                            )}

                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={responseData[ques.id]}
                                onChange={(e) => {
                                  handleRadioChange(ques.id, e.target.value);
                                }}
                              >
                                {ques.options.map((option, index) => (
                                  <div key={option.id}>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={option.id}
                                        control={<Radio />}
                                        label={option.optionText}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {option.optionImage !== "" ? (
                                        <img
                                          src={option.optionImage}
                                          width="64%"
                                          height="auto"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <Divider />
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography variant="body1">Form submitted</Typography>
                <Typography variant="body2">
                  Thanks for submitting form
                </Typography>

                <Button onClick={reloadForAnotherResponse}>
                  Submit another response
                </Button>
              </div>
            )}
          </Grid>
        </Grid>

        <FormFooter />
      </div>
    </div>
  );
}

export default UserView;

const FormControlLabelWrapper = (props) => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};
