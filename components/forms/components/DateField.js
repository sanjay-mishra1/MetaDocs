import { IconButton, TextField } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import dayjs from "dayjs";
import React from "react";
import DateValidationUI from "../validations/DateValidationUI";

export default function DateField({
  optionData,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
  time,
  edit,
  removeOption,
}) {
  const handleValue = (e) => {
    handleOptionValue(
      { ...optionData, optionText: e.target.value },
      questionIndex,
      optionIndex
    );
  };
  return (
    <>
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
        <TextField
          fullWidth
          className="data-field"
          onChange={handleValue}
          // type={time ? "time" : "date"}
          variant="outlined"
          value={optionData.optionText}
          label="Option Text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            removeOption(questionIndex, optionIndex);
          }}
        >
          <Close />
        </IconButton>
      </div>
      {!time && (
        <DateValidationUI
          handleOptionValue={handleOptionValue}
          optionData={optionData}
          optionIndex={optionIndex}
          questionIndex={questionIndex}
        />
      )}
    </>
  );
}
