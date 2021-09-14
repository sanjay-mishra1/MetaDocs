import { TextField } from "@material-ui/core";
import dayjs from "dayjs";

import React, { useState } from "react";
import { dateValidationTypes } from "../../../files/Lists";

export default function DateValidationUI({
  handleOptionValue,
  questionIndex,
  optionIndex,
  optionData,
}) {
  const [showFileType, setShowFileType] = React.useState(
    !optionData || !optionData.allowed
      ? "any"
      : optionData.allowed.includes("any")
      ? "any"
      : "range"
  );
  const [fromDate, setFromDate] = useState(
    optionData.allowed && optionData.allowed.length === 3
      ? optionData.allowed[1]
      : ""
  );
  const [toDate, setToDate] = useState(
    optionData.allowed && optionData.allowed.length === 3
      ? optionData.allowed[2]
      : ""
  );
  const [id] = React.useState(new Date().getTime() + "");
  const handleCheckbox = () => {
    let type = document.getElementById(id).value;
    console.log("value change", type);
    if (!type || type.toLowerCase().includes("any")) setShowFileType(false);
    else setShowFileType(true);
    handleOptionValue(
      { ...optionData, allowed: type ? [type] : type[name.indexOf(type)] },
      questionIndex,
      optionIndex
    );
    console.log("value change", optionData, optionData.allowed);
  };
  const handleFromValue = (e) => {
    if (!optionData.allowed) {
      optionData.allowed = ["", "", ""];
    }
    let items = optionData.allowed;
    items.length = 3;
    items[1] = e.target.value;
    optionData.allowed = items;
    console.log(optionData);
    setFromDate(e.target.value);
  };
  const handleToValue = (e) => {
    if (!optionData.allowed) {
      optionData.allowed = ["", "", ""];
    }
    let items = optionData.allowed;
    items.length = 3;
    items[2] = e.target.value;
    optionData.allowed = items;
    console.log(optionData);
    setToDate(e.target.value);
  };
  return (
    <div className="ml-8">
      <p>Date Validation</p>
      <div>
        {
          <div className="equal-spaced-view">
            <select
              id={id}
              className="w-40 border-2 font-semibold py-2 px-4 rounded inline-flex items-center"
              defaultValue={optionData.allowed ? optionData.allowed[0] : "any"}
              onChange={handleCheckbox}
            >
              {dateValidationTypes.map((item) => (
                <option
                  key={item.name}
                  className="rounded-t  py-2 px-4 block whitespace-no-wrap"
                  value={item.type}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        }
        {showFileType &&
          optionData.allowed &&
          !optionData.allowed.includes("any") && (
            <div className="flex">
              <TextField
                fullWidth={true}
                variant="outlined"
                label="From"
                type="date"
                style={{ marginTop: "5px" }}
                value={fromDate}
                onChange={handleFromValue}
              />
              <TextField
                fullWidth={true}
                variant="outlined"
                label="To"
                type="date"
                style={{ marginTop: "5px" }}
                value={toDate}
                onChange={handleToValue}
              />
            </div>
          )}
      </div>
    </div>
  );
}
