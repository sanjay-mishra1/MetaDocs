import { IconButton, TextField } from "@material-ui/core";
import React from "react";
import Icon from "@material-tailwind/react/Icon";
import Close from "@material-ui/icons/Close";
import AttachmentTypes from "../validations/AttachmentTypes";

function FileUploader({
  optionData,
  handleOptionValue,
  uploadImage,
  questionIndex,
  optionIndex,
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
    <div>
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
        <div style={{ placeSelf: "center", marginRight: 12, marginLeft: 6 }}>
          <Icon
            name="attach_file"
            color="gray"
            size="2xl"
            className="place-self-center align-center"
          />
        </div>
        <TextField
          fullWidth={true}
          variant="outlined"
          placeholder="Option text"
          style={{ marginTop: "5px" }}
          value={optionData.optionText}
          onChange={handleValue}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            removeOption(questionIndex, optionIndex);
          }}
        >
          <Close />
        </IconButton>
        <br />
      </div>
      <AttachmentTypes
        handleOptionValue={handleOptionValue}
        optionData={optionData}
        optionIndex={optionIndex}
        questionIndex={questionIndex}
      />
    </div>
  );
}

export default FileUploader;
