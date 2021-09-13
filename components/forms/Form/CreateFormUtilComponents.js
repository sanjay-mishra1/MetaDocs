import { Paper, Tooltip, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccordionActions from "@material-ui/core/AccordionActions";
import Divider from "@material-ui/core/Divider";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import SaveIcon from "@material-ui/icons/Save";
import { Checkbox, Grid, RadioGroup } from "@material-ui/core";
import Icon from "@material-tailwind/react/Icon";
import React from "react";
import { formTypes } from "../../../files/Lists";

export const EditQuestionView = ({
  index,
  ques,
  handleQuestionValue,
  uploadImage,
  checkImageHereOrNotForQuestion,
  updateImageLink,
  checkImageHereOrNotForOption,
  getOptionTypeUi,
  removeOption,
  addOption,
}) => {
  return (
    <AccordionDetails>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "15px",
          marginTop: "-15px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ marginTop: "20px" }}>{index + 1}.</Typography>
          <TextField
            fullWidth={true}
            variant="outlined"
            placeholder="Question Text"
            style={{ marginBottom: "18px" }}
            minRows={1}
            maxRows={20}
            multiline={true}
            value={ques.questionText}
            onChange={(e) => {
              handleQuestionValue(e.target.value, index);
            }}
          />
          <IconButton
            aria-label="upload image"
            onClick={() => {
              uploadImage(index, null);
            }}
          >
            <CropOriginalIcon />
          </IconButton>
        </div>

        <div>
          {checkImageHereOrNotForQuestion(ques.questionImage) ? (
            <div>
              <div
                style={{
                  width: "150px",
                  display: "flex",
                  alignItems: "flex-start",
                  paddingLeft: "20px",
                }}
              >
                <img src={ques.questionImage} width="150px" height="auto" />
                <IconButton
                  style={{
                    marginLeft: "-15px",
                    marginTop: "-15px",
                    zIndex: 999,
                    backgroundColor: "lightgrey",
                    color: "grey",
                  }}
                  size="small"
                  onClick={() => {
                    updateImageLink("", {
                      question: index,
                      option: null,
                    });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <QuestionUI
          checkImageHereOrNotForOption={checkImageHereOrNotForOption}
          getOptionTypeUi={getOptionTypeUi}
          index={index}
          ques={ques}
          removeOption={removeOption}
          updateImageLink={updateImageLink}
        />
        <div>
          <FormControlLabel
            disabled
            control={<Radio />}
            label={
              <Button
                size="small"
                onClick={() => {
                  addOption(index);
                }}
                style={{
                  textTransform: "none",
                  marginLeft: "-5px",
                }}
              >
                Add Option
              </Button>
            }
          />
        </div>

        <br></br>
        <br></br>
      </div>
    </AccordionDetails>
  );
};

export const QuestionDemoView = ({ questions, index, ques }) => {
  return (
    <AccordionSummary
      aria-controls="panel1a-content"
      id="panel1a-header"
      elevation={1}
      style={{ width: "100%" }}
    >
      {!questions[index].open ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "3px",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: "0px" }}>
            {index + 1}. {ques.questionText}
          </Typography>

          {ques.questionImage !== "" ? (
            <div>
              <img src={ques.questionImage} width="400px" height="auto" />
              <br></br>
              <br></br>
            </div>
          ) : (
            ""
          )}

          {ques.options.map((op, j) => (
            <div key={j}>
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  disabled
                  control={<Radio style={{ marginRight: "3px" }} />}
                  label={
                    <Typography style={{ color: "#555555" }}>
                      {ques.options[j].optionText}
                    </Typography>
                  }
                />
              </div>

              <div>
                {op.optionImage !== "" ? (
                  <img src={op.optionImage} width="160px" height="auto" />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </AccordionSummary>
  );
};

export const FormActions = ({ addMoreQuestionField, saveQuestions }) => {
  const addMoreClicked = (type) => {
    // setShowFormAction();
    addMoreQuestionField(type);
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={saveQuestions}
        style={{ margin: "15px" }}
        endIcon={<SaveIcon />}
      >
        Save Questions{" "}
      </Button>
      <Paper
        className="flex flex-row bottom-0 left-0 right-0 sm:left-auto sm:right-0 fixed sm:flex-col sm:bottom-9"
        variant="outlined"
      >
        {" "}
        <div className="bg-green-300 text-center hidden  sm:visible ">
          <Icon color="white" name="add" size="2xl" />
        </div>
        {formTypes.map((type, index) => (
          <Tooltip placement="left" arrow title={type.name}>
            <IconButton
              key={index}
              variant="contained"
              onClick={() => addMoreClicked(type.type)}
            >
              <Icon color="black" name={type.icon} size="2xl" />
            </IconButton>
          </Tooltip>
        ))}
      </Paper>
    </React.Fragment>
  );
};

export const FormHeader = ({ name, description }) => {
  return (
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
                {name}
              </Typography>
              <Typography variant="subtitle1">{description}</Typography>
            </div>
          </Paper>
        </div>
      </div>
    </Grid>
  );
};

export const QuestionUI = ({
  getOptionTypeUi,
  index,
  ques,
  removeOption,
  checkImageHereOrNotForOption,
  updateImageLink,
}) => {
  return (
    <div style={{ width: "100%" }}>
      {ques.options.map((op, j) => (
        <div key={j}>
          {getOptionTypeUi(ques.options[j], ques.type, index, j)}

          <div>
            {checkImageHereOrNotForOption(op.optionImage) ? (
              <div>
                <div
                  style={{
                    width: "150px",
                    display: "flex",
                    alignItems: "flex-start",
                    paddingLeft: "20px",
                  }}
                >
                  <img src={op.optionImage} width="90px" height="auto" />

                  <IconButton
                    style={{
                      marginLeft: "-15px",
                      marginTop: "-15px",
                      zIndex: 999,
                      backgroundColor: "lightgrey",
                      color: "grey",
                    }}
                    size="small"
                    onClick={() => {
                      updateImageLink("", {
                        question: index,
                        option: j,
                      });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <br></br>
                <br></br>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export const QuestionActions = ({
  index,
  copyQuestion,
  showAsQuestion,
  deleteQuestion,
  setRequiredField,
  ques,
}) => {
  return (
    <>
      <Divider />
      <div className="flex content-around p-2">
        <Typography
          variant="body2"
          style={{ color: "grey", maxWidth: "80%" }}
          className="pr-10"
        >
          Required field will force the user to enter/select the information
          requested
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={ques.required}
              onChange={(e) => setRequiredField(e, ques)}
              name="required"
            />
          }
          label="Required"
        />
      </div>
      <Divider />
      <AccordionActions>
        <IconButton
          aria-label="View"
          onClick={() => {
            showAsQuestion(index);
          }}
        >
          <VisibilityIcon />
        </IconButton>

        <IconButton
          aria-label="Copy"
          onClick={() => {
            copyQuestion(index);
          }}
        >
          <FilterNoneIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem />

        <IconButton
          aria-label="delete"
          onClick={() => {
            deleteQuestion(index);
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>

        <IconButton aria-label="Image">
          <MoreVertIcon />
        </IconButton>
      </AccordionActions>
    </>
  );
};
