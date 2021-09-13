import { IconButton, TextField } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React from "react";
import { isNumber } from "../../../files/util";

export default function Rating({
  optionData,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
  edit,
  removeOption,
}) {
  const handleTextValue = (e) => {
    handleOptionValue(
      { maxNumber: optionData.maxNumber, optionText: e.target.value },
      questionIndex,
      optionIndex
    );
  };
  const handleRatingValue = (e) => {
    setStars(e.target.value);
    handleOptionValue(
      {
        maxNumber: isNumber(stars) ? parseInt(stars) : 0,
        optionText: optionData.optionText,
      },
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
      <div>
        <TextField
          fullWidth={true}
          variant="outlined"
          label="Option text"
          style={{ marginTop: "5px" }}
          value={optionData.optionText}
          onChange={handleTextValue}
        />
        <TextField
          fullWidth={true}
          variant="outlined"
          label="Number of stars"
          type="number"
          style={{ marginTop: "5px" }}
          value={optionData.maxNumber}
          onChange={handleRatingValue}
        />
      </div>
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
}
