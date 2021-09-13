import React from "react";
import formService from "../../../files/apis";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ResponseTab(props) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  console.log("responsetab", props.formData);
  React.useEffect(() => {
    if (props.formData) {
      setQuestions(props.formData.questions);
      setFormData(props.formData);
    }
    var formId = props.formId;
    if (formId !== undefined && formId !== "") {
      formService.getResponse(formId).then(
        (data) => {
          //      console.log(data);
          setResponseData(data);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  }, [props.formId, props.formData]);

  function getSelectedOption(qId, i, j) {
    var oneResData = responseData[j];
    //console.log(oneResData);

    // var selectedOp = oneResData.response.filter(
    //   (qss) => qss.questionId === qId
    // );
    // console.log(selectedOp);
    console.log(
      "responses ",
      responseData,
      i,
      j,
      responseData[j],
      responseData[j].response,
      questions[i]
    );

    try {
      var selectedOpId = responseData[j].response[qId];
      var selectedOp = questions[i].options.find(
        (option) => option.id === selectedOpId
      ).optionText;
      console.log(
        "selectedOpId",
        selectedOpId,
        "qid",
        qId,
        "selectedOp",
        selectedOp
      );
      return selectedOp;
    } catch (error) {
      console.log(error);
      return "Question Deleted";
    }
  }
  return (
    <div>
      <p> Responses</p>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                {questions.map((ques, i) => (
                  <TableCell key={i} align="right">
                    {ques.questionText}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {responseData &&
                responseData.map((rs, j) => (
                  <TableRow key={j}>
                    <TableCell component="th" scope="row">
                      {rs.userId}
                    </TableCell>
                    {questions.map((ques, index) => (
                      <TableCell key={index} align="right">
                        {getSelectedOption(ques.id, index, j)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
export default ResponseTab;
