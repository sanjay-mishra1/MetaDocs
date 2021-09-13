exports.fileTypes = [
  { name: "Document", dbPath: "docs", path: "docs", image: "/app_icon.png" },
  {
    name: "Workbook",
    dbPath: "workbook",
    path: "workbook",
    image: "/workbook.png",
  },
  { name: "Forms", dbPath: "form", path: "form", image: "/forms.png" },
  { name: "Files", dbPath: "files", path: "files", image: "/folder.png" },
];

exports.spreadsheetOption = {
  mode: "edit", // edit | read
  showToolbar: true,
  showGrid: true,
  showContextmenu: true,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  row: {
    len: 600,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: "#ffffff",
    align: "left",
    valign: "middle",
    textwrap: false,
    strike: false,
    underline: false,
    color: "#0a0a0a",
    font: {
      name: "Helvetica",
      size: 10,
      bold: false,
      italic: false,
    },
  },
};

exports.formDefault = {
  backgroundColor: "#f7f4f2",
};

exports.formTypes = [
  {
    name: "Single Choice",
    icon: "radio_button_checked",
    type: "singleSelection",
  },
  {
    name: "Multiple Choice",
    icon: "check_box",
    type: "multiSelection",
  },
  {
    name: "Text",
    icon: "font_download",
    type: "text",
  },
  {
    name: "Date",
    icon: "date_range",
    type: "date",
  },
  {
    name: "Time",
    icon: "schedule",
    type: "time",
  },
  {
    name: "Rating",
    icon: "star_outline",
    type: "rating",
  },
  {
    name: "File Upload",
    icon: "upload_file",
    type: "file",
  },
  {
    name: "Drop Down",
    icon: "arrow_drop_down_circle",
    type: "list",
  },
];

exports.attachmentTypes = [
  { name: "Image", type: ".jpg,.png" },
  { name: "ZIP", type: ".zip" },
  { name: "Document", type: ".doc,docx" },
  { name: "Presentation", type: ".ppt" },
  { name: "Video", type: ".mp4" },
  { name: "Audio", type: ".mp3" },
  { name: "Excel", type: ".xls,.xlsx" },
  { name: "PDF", type: ".pdf" },
];
exports.textValidationType = [
  { name: "Text Multiline", type: "multiline" },
  { name: "Single Line", type: "singleline" },
  { name: "Email", type: "email" },
  { name: "Phone Number", type: "phone" },
  { name: "Mobile Number", type: "mobile" },
  { name: "Only Number", type: "number" },
  { name: "Between", type: "between" },
];
exports.dateValidationTypes = [
  { name: "Date (Any)", type: "any" },
  { name: "Date Range", type: "range" },
];
