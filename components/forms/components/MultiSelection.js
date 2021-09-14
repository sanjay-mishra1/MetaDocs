import { Checkbox, IconButton, TextField } from "@material-ui/core";
import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Close from "@material-ui/icons/Close";

export default function MultiSelection({
  optionData,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
  edit,
  removeOption,
  questionViewData,
}) {
  return (
    <React.Fragment>
      {edit ? (
        <EditView
          optionData={optionData}
          handleOptionValue={handleOptionValue}
          uploadImage={uploadImage}
          questionIndex={questionIndex}
          optionIndex={optionIndex}
          removeOption={removeOption}
        />
      ) : (
        <QuestionView {...questionViewData} />
      )}
    </React.Fragment>
  );
}

const EditView = ({
  optionData,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
  removeOption,
}) => {
  const handleValue = (e) => {
    handleOptionValue(
      { ...optionData, optionText: e.target.value },
      questionIndex,
      optionIndex
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "-12.5px",
        justifyContent: "space-between",
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      <Checkbox disabled />
      <TextField
        fullWidth={true}
        variant="outlined"
        placeholder="Option text"
        style={{ marginTop: "5px" }}
        value={optionData.optionText}
        onChange={handleValue}
      />

      <IconButton
        aria-label="upload image"
        onClick={() => {
          uploadImage(questionIndex, optionIndex);
        }}
      >
        <CropOriginalIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => {
          removeOption(questionIndex, optionIndex);
        }}
      >
        <Close />
      </IconButton>
    </div>
  );
};

const QuestionView = ({ questionId, responseData, options, actionMethod }) => {
  console.log("options", options, "reciev ques data", data);
  return (
    <RadioGroup
      aria-label="quiz"
      name="quiz"
      value={responseData[questionId]}
      onChange={(e) => {
        actionMethod(questionId, e.target.value);
      }}
    >
      {options.map((option, index) => (
        <div key={option.id}>
          <div
            style={{
              display: "flex",
              marginLeft: "7px",
            }}
          >
            <FormControlLabel
              value={option.id}
              control={<Radio name={option.id} />}
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
              <img src={option.optionImage} width="64%" height="auto" />
            ) : (
              ""
            )}
            <Divider />
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};
