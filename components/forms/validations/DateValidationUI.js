import {
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
} from "@material-ui/core";
import React from "react";
import { attachmentTypes, dateValidationTypes } from "../../../files/Lists";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function DateValidationUI({
  handleOptionValue,
  questionIndex,
  optionIndex,
  optionData,
}) {
  const [showFileType, setShowFileType] = React.useState(
    !optionData && optionData.allowed
      ? optionData.allowed.includes("any")
        ? false
        : true
      : false
  );
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleCheckbox = (type) => {
    console.log("value change", type);
    if (!type || type.toLowerCase().includes("any")) setShowFileType(false);
    else setShowFileType(true);
    handleOptionValue(
      { ...optionData, allowed: type ? [type] : type[name.indexOf(type)] },
      questionIndex,
      optionIndex
    );
    console.log("value change", optionData);
  };
  const name = [];
  dateValidationTypes.forEach((item) => name.push(item.name));
  const type = [];
  dateValidationTypes.forEach((item) => type.push(item.type));
  return (
    <div className="ml-8">
      <p>Date Validation</p>
      <div>
        {
          <div className="equal-spaced-view">
            <TextField
              fullWidth={true}
              variant="outlined"
              style={{ marginTop: "5px" }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            />
            <Option
              open={open}
              anchorRef={anchorRef}
              handleClose={handleClose}
              handleListKeyDown={handleListKeyDown}
              handleCheckbox={handleCheckbox}
            />
          </div>
        }
        {showFileType && (
          <div className="flex">
            <TextField
              fullWidth={true}
              variant="outlined"
              label="From"
              type="date"
              style={{ marginTop: "5px" }}
              // value={optionData.optionText}
              // onChange={handleValue}
            />
            <TextField
              fullWidth={true}
              variant="outlined"
              label="To"
              type="date"
              style={{ marginTop: "5px" }}
              // value={optionData.optionText}
              // onChange={handleValue}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const Option = ({
  open,
  anchorRef,
  handleClose,
  handleListKeyDown,
  handleCheckbox,
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                {dateValidationTypes.map((item) => (
                  <MenuItem onClick={() => handleCheckbox(item.type)}>
                    {item.name}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
