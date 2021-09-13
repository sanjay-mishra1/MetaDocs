import { IconButton, Radio, TextField } from "@material-ui/core";
import React from "react";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Close from "@material-ui/icons/Close";

export default function SingleSelection({
  optionText,
  handleOptionValue,
  uploadImage,
  i,
  j,
  edit,
  removeOption,
}) {
  const handleValue = (e) => {
    handleOptionValue({ optionText: e.target.value }, i, j);
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
      <Radio disabled />
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
          uploadImage(i, j);
        }}
      >
        <CropOriginalIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => {
          removeOption(i, j);
        }}
      >
        <Close />
      </IconButton>
    </div>
  );
}
