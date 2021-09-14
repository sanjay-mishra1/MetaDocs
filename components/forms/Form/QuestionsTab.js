import React from "react";
import Accordion from "@material-ui/core/Accordion";

//import QuestionHeader from './QuestionHeader';
import { Button, Grid } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ImageUplaodModel from "./ImageUplaodModel";
import formService from "../../../files/apis";
import CircularProgress from "@material-ui/core/CircularProgress";
import { generateUniqueId } from "../../../files/util";
import SingleSelection from "../components/SingleSelection";
import MultiSelection from "../components/MultiSelection";
import DateField from "../components/DateField";
import FileUploader from "../components/FileUploader";
import Rating from "../components/Rating";
import TextDataField from "../components/TextDataField";
import Dropdown from "../components/Dropdown";

import {
  EditQuestionView,
  FormActions,
  FormHeader,
  QuestionActions,
  QuestionDemoView,
} from "../../../components/forms/Form/CreateFormUtilComponents";
function QuestionsTab(props) {
  const [questions, setQuestions] = React.useState([]);
  const [openUploadImagePop, setOpenUploadImagePop] = React.useState(false);
  const [imageContextData, setImageContextData] = React.useState({
    question: null,
    option: null,
  });
  const [formData, setFormData] = React.useState({});
  const [loadingFormData, setLoadingFormData] = React.useState(true);

  React.useEffect(() => {
    if (props.formData.questions !== undefined) {
      if (props.formData.questions.length === 0) {
        setQuestions([
          {
            questionText: "Question",
            options: [{ optionText: "Option 1", id: generateUniqueId() }],
            open: false,
            type: "single",
          },
        ]);
      } else {
        setQuestions(props.formData.questions);
      }
      setLoadingFormData(false);
      setFormData(props.formData);
    } else if (props.formData.status === 200) {
      setFormData(props.formData);
      setLoadingFormData(false);
    }
  }, [props.formData]);

  function saveQuestions() {
    console.log("auto saving questions initiated");
    var data = {
      formId: formData._id,
      name: formData.name,
      description: formData.description,
      questions: questions,
    };

    formService.autoSave(data).then(
      (result) => {
        console.log(result);
        setQuestions(result.questions);
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

  function checkImageHereOrNotForQuestion(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "") {
      return false;
    } else {
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "") {
      return false;
    } else {
      return true;
    }
  }

  function addMoreQuestionField(type) {
    expandCloseAll();

    setQuestions((questions) => [
      ...questions,
      {
        questionText: "",
        options: [{ optionText: "", id: generateUniqueId() }],
        type: type,
        open: true,
        id: generateUniqueId(),
      },
    ]);
  }

  function copyQuestion(i) {
    let qs = [...questions];
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach((opn) => {
      if (opn.optionImage !== undefined || opn.optionImage !== "") {
        var opn1new = {
          optionText: opn.optionText,
          optionImage: opn.optionImage,
        };
      } else {
        var opn1new = {
          optionText: opn.optionText,
        };
      }
      myNewOptions.push(opn1new);
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = {
      questionText: qs[i].questionText,
      questionImage: qImage,
      options: myNewOptions,
      open: true,
      type: qs[i].type,
    };
    setQuestions((questions) => [...questions, newQuestion]);
  }

  const handleImagePopupOpen = () => {
    setOpenUploadImagePop(true);
  };

  function uploadImage(i, j) {
    setImageContextData({
      question: i,
      option: j,
    });
    handleImagePopupOpen();
  }

  function updateImageLink(link, context) {
    var optionsOfQuestion = [...questions];
    var i = context.question;

    if (context.option == null) {
      optionsOfQuestion[i].questionImage = link;
    } else {
      var j = context.option;
      optionsOfQuestion[i].options[j].optionImage = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function handleOptionValue(data, i, j) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j] = data;
    setQuestions(optionsOfQuestion);
    console.log(data);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i) {
    let qs = [...questions];
    qs[i].open = false;
    setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options.push({
      optionText: "",
      id: generateUniqueId(),
      type: "single",
    });

    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      console.log(i + "__" + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }
  function getOptionTypeUi(data, type, i, j) {
    console.log("text", text, "type", type, i, j);
    let text = data.optionText;
    switch (type) {
      case "singleSelection":
        return (
          <SingleSelection
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            i={i}
            j={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "multiSelection":
        return (
          <MultiSelection
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "text":
        return (
          <TextDataField
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "date":
        return (
          <DateField
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "time":
        return (
          <DateField
            time
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "rating":
        return (
          <Rating
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "file":
        return (
          <FileUploader
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      case "list":
        return (
          <Dropdown
            optionData={data}
            edit
            handleOptionValue={handleOptionValue}
            questionIndex={i}
            optionIndex={j}
            uploadImage={uploadImage}
            removeOption={removeOption}
          />
        );
      default:
        return null;
    }
  }
  const setRequiredField = (e, question) => {
    console.log("checkbox", question.required, e.target.checked);
    question.required = e.target.checked;
  };
  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ width: "100%", marginBottom: "-7px" }}>
                  <DragIndicatorIcon
                    style={{ transform: "rotate(-90deg)", color: "#DAE0E2" }}
                    fontSize="small"
                  />
                </div>

                <Accordion
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open}
                >
                  <QuestionDemoView
                    index={i}
                    ques={ques}
                    questions={questions}
                  />
                  <EditQuestionView
                    addOption={addOption}
                    index={i}
                    checkImageHereOrNotForOption={checkImageHereOrNotForOption}
                    checkImageHereOrNotForQuestion={
                      checkImageHereOrNotForQuestion
                    }
                    getOptionTypeUi={getOptionTypeUi}
                    handleQuestionValue={handleQuestionValue}
                    ques={ques}
                    removeOption={removeOption}
                    updateImageLink={updateImageLink}
                    uploadImage={uploadImage}
                  />
                  <QuestionActions
                    index={i}
                    copyQuestion={copyQuestion}
                    showAsQuestion={showAsQuestion}
                    deleteQuestion={deleteQuestion}
                    setRequiredField={setRequiredField}
                    ques={ques}
                  />
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div
      style={{
        marginTop: "15px",
        marginBottom: "7px",
        paddingBottom: "30px",
        textAlign: "-webkit-center",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={9}
        lg={5}
        md={6}
      >
        {loadingFormData ? <CircularProgress /> : ""}

        <Grid item style={{ width: "100%", textAlign: "initial" }}>
          <FormHeader formData={formData} />

          <div item style={{ paddingTop: "10px" }}>
            <div>
              <ImageUplaodModel
                handleImagePopOpen={openUploadImagePop}
                handleImagePopClose={() => {
                  setOpenUploadImagePop(false);
                }}
                updateImageLink={updateImageLink}
                contextData={imageContextData}
              />

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {questionsUI()}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <FormActions
                addMoreQuestionField={addMoreQuestionField}
                saveQuestions={saveQuestions}
              />
              <div className="fixed">
                <Button>Test</Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuestionsTab;
