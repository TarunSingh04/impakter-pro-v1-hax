import { QUESTION_SET_7, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { Question } from "../../utilities/components/questionnaire/question/question";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import { AnswerInputField } from "../../utilities/components/questionnaire/inputfields/inputfields";
import { useState } from "react";
import { X } from "lucide-react";

function Lot7(props) {
  const [documents, setDocuments] = useState([]);

  const addDocument = () => {
    setDocuments([
      ...documents,
      {
        title: "",
        name: "",
        registration_number: "",
      },
    ]);
  };

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(4);
            }}
            onSave={() => {}}
          />

          <div className={styles.question_container}>
            <div>
              <p className={styles.headertext}>Governance</p>
              <p className={styles.subheadertext}>
                Data security and privacy protection
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_7.map((question, index) => {
                  return (
                    <Question
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={() => {}}
                    />
                  );
                })}
              </ul>

              <div>
                {documents.map((doc, index) => {
                  return (
                    <div key={`document-${index}`}>
                      <p style={{ marginTop:"15px", display: "flex", flexDirection: "row", alignItems: "end", fontSize: "14px" }}>
                        New Document
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "red",
                            margin: "0 5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            removeDocument(index);
                          }}
                        >
                          <X size={15}/>
                        </button>
                      </p>
                      {Object.keys(doc).map((key, i) => {
                        return (
                          <AnswerInputField
                            key={`${index}-${i}`}
                            index={i}
                            option={key}
                            inputType={
                              key == "registration_number" ? "number" : "text"
                            }
                            placeholder={
                              key == "registration_number"
                                ? "Registration Number"
                                : key == "name"
                                  ? "Name of Provider"
                                  : "Title of Document"
                            }
                            selectedOption={doc[key]}
                            onChange={(value) => {
                              const newDocuments = [...documents];
                              newDocuments[index][key] = value;
                              setDocuments(newDocuments);
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                }}
              >
                <PrimaryButton
                  outlined={true}
                  hasBorder={false}
                  onClick={() => {
                    addDocument();
                  }}
                  label={"+ ADD MORE DOCUMENTS"}
                />
              </div>

              {/* Next Button */}
              <PrimaryButton
                onClick={() => {
                  props.onSubmit(0);
                }}
                label={"NEXT PAGE"}
              />
            </div>

            {/* Progress */}

            <ProgressBar progress={95} label={"Governance - STEP 7"} />
          </div>
        </div>
      </QuestionLayout>
    </>
  );
}

export default Lot7;
