import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React from "react";
import { attachmentTypes } from "../../../files/Lists";

export default function AttachmentTypes({
  handleOptionValue,
  questionIndex,
  optionIndex,
  optionData,
}) {
  const [showFileType, setShowFileType] = React.useState(
    !optionData.allowed ? false : true
  );

  const handleCheckbox = (isChecked, type) => {
    let types;
    if (type === "all") {
      if (isChecked) types = null;
      else types = [];
      setShowFileType(!showFileType);
    } else {
      types = optionData.allowed ? optionData.allowed : [];
      if (isChecked) {
        types.push(type);
      } else {
        const index = types.indexOf(type);
        if (index > -1) {
          types.splice(index, 1);
        }
      }
    }
    handleOptionValue(
      { ...optionData, allowed: types },
      questionIndex,
      optionIndex
    );
  };
  return (
    <div className="ml-8">
      <p>File type allowed</p>
      <div>
        {
          <FormControlLabel
            value="all"
            className="w-4/5"
            control={<Checkbox checked={!showFileType} color="primary" />}
            label="All Types"
            labelPlacement="end"
            onChange={(e) => {
              handleCheckbox(e.target.checked, "all");
            }}
          />
        }

        {showFileType && (
          <div className="equal-spaced-view">
            {attachmentTypes.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      optionData && optionData.allowed
                        ? optionData.allowed.includes(item.type)
                        : false
                    }
                    color="primary"
                  />
                }
                label={item.name}
                labelPlacement="end"
                name={item.name}
                key={item.name}
                onChange={(e) => handleCheckbox(e.target.checked, item.type)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
