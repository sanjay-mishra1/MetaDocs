import { Checkbox, IconButton, TextField } from "@material-ui/core";
import React from "react";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Close from "@material-ui/icons/Close";

export default function MultiSelection({
  optionText,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
  edit,
  removeOption,
}) {
  const handleValue = (e) => {
    handleOptionValue(
      { optionText: e.target.value },
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
        value={optionText}
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
}
