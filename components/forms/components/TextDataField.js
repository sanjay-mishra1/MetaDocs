import { TextField } from "@material-ui/core";
import React from "react";
import TextValidationUI from "../validations/TextValidationUI";

export default function TextDataField({
  optionData,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
  edit,
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
      <div>
        <TextField
          fullWidth={true}
          variant="outlined"
          placeholder="Option text"
          style={{ marginTop: "5px" }}
          value={optionData.optionText}
          onChange={handleValue}
        />
      </div>
      <TextValidationUI
        handleOptionValue={handleOptionValue}
        optionData={optionData}
        optionIndex={optionIndex}
        questionIndex={questionIndex}
      />
    </>
  );
}
