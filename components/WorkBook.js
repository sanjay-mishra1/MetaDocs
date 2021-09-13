import { spreadsheetOption } from "../files/Lists";
import "../files/spreadsheet";
import { prepareSheetData } from "../files/util";
import { getData } from "../hooks/GetDB";
import { storeData } from "../hooks/StoreDB";

import React, { Component } from "react";

export class WorkBook extends Component {
  constructor(props) {
    super(props);
    this.state = { sheetState: [] };
  }
  componentDidMount() {
    const creds = {
      id: this.props.id,
      emailId: this.props.userId,
      path: "workbook",
    };
    getData(creds).then((docs) => {
      console.log("inside func", creds, docs.data);
      this.initSheet(docs && docs.data ? docs.data : {});
    });
  }
  initSheet = (initialData) => {
    this.setState({ sheetState: initialData });
    console.log("initial data", initialData);
    x_spreadsheet("#x-spreadsheet-demo")
      .loadData(initialData)
      .change((data) => {
        let newData = prepareSheetData(this.state.sheetState, data);
        this.setState({ sheetState: newData });
        console.log("new sheet state", newData);
        storeData(newData, {
          emailId: this.props.userId,
          id: this.props.id,
          path: "workbook",
        });
      })
      .on("cell-selected", (cell, ri, ci) => {
        console.log("cell-selected", cell, ri, ci);
      })
      .on("cells-selected", (cell, { sri, sci, eri, eci }) => {
        console.log("cell-selected and edited", sri, sci, eri, eci);
      })
      // edited on cell
      .on("cell-edited", (text, ri, ci) => {
        console.log("cell-edited", ri, ci);
      });
  };
  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://unpkg.com/x-data-spreadsheet@1.1.5/dist/xspreadsheet.css"
        />

        <div id="x-spreadsheet-demo"></div>
      </>
    );
  }
}

export default WorkBook;

// function WorkBook({ id, userId }) {
//   const [sheetState, setSheetState] = React.useState([]);
//   React.useEffect(() => {
//     const creds = { id, emailId: userId, path: "workbook" };
//     getData(creds).then((docs) => {
//       console.log("inside func", creds, docs.data);
//       initSheet(docs && docs.data ? docs.data : {});
//     });
//   }, []);
//   const initSheet = (initialData) => {
//     setSheetState(initialData);
//     console.log("initial data", initialData);
//     x_spreadsheet("#x-spreadsheet-demo")
//       .loadData(initialData)
//       .change((data) => {
//         let newData = prepareSheetData(sheetState, data);
//         setSheetState(newData);
//         console.log("new sheet state", newData);
//         storeData(newData, {
//           emailId: userId,
//           id,
//           path: "workbook",
//         });
//       })
//       .on("cell-selected", (cell, ri, ci) => {
//         console.log("cell-selected", cell, ri, ci);
//       })
//       .on("cells-selected", (cell, { sri, sci, eri, eci }) => {
//         console.log("cell-selected and edited", sri, sci, eri, eci);
//       })
//       // edited on cell
//       .on("cell-edited", (text, ri, ci) => {
//         console.log("cell-edited", ri, ci);
//       });
//   };
//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://unpkg.com/x-data-spreadsheet@1.1.5/dist/xspreadsheet.css"
//       />

//       <div id="x-spreadsheet-demo"></div>
//     </>
//   );
// }

// export default WorkBook;
