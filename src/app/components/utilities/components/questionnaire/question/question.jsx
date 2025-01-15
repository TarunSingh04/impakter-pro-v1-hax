import styles from "./question.module.scss";
import { useState } from "react";
import {
  AnswerInputField,
  AnswerRadioButtonField,
  AnswerCheckboxField,
} from "../inputfields/inputfields";
import { UploadButton } from "../buttons/buttons";
import { SquareArrowOutUpRight } from "lucide-react";

export const SubQuestion = ({
  index,
  question,
  onChange,
  inputType = "text",
}) => {
  const [selectedOption, setSelectedOption] = useState(
    question.choice_type == "radio"
      ? null
      : Array(question.choices.length).fill(false)
  );

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option));
    } else {
      setSelectedOption([...selectedOption, option]);
    }
  };

  return (
    <>
      <div key={`${index}:questions`}>
      <div style={
        {
          display : "flex",
          flexDirection : "row",
          gap:"10px",
          padding: !question.question.includes("Other")?"10px 5px":"10px 5px",
          marginBottom: "-5px",
          marginTop: !question.question.includes("Other")?"15px":"0",
          borderRadius: "10px",
          backgroundColor: question.question_type == "checkbox" && !question.question.includes("Other") ? "#fafafa": "transparent"
        }
      }>
        {question.question_type == "checkbox" && (
          <input
            style={
              {
                marginRight:"5px"
              }
            }
            type="checkbox"
            checked={isChecked}
            value={question}
            onChange={(e) => {
              setIsChecked(!isChecked);
            }}
          />
        )}
        <p className={styles.subquestiontext}>{question.question}</p>
      </div>
        
        <div
          className={
            question.choice_orientation == "horizontal"
              ? styles.option_container_horizontal
              : styles.option_container
          }
        >
          {question.choices.map((option, choiceIndex) => {
            if (question.choice_type == "radio") {
              return (
                <AnswerRadioButtonField
                  hasInputBox={question.has_input}
                  key={`${choiceIndex}:sub_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);
                  }}
                />
              );
            } else {
              return (
                <AnswerCheckboxField
                  hasInputBox={question.has_input}
                  key={`${choiceIndex}:sub_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    handleCheckboxChange(option);
                  }}
                />
              );
            }
          })}
        </div>

        {/* File */}

        {/* Input Field */}
        {question.text_labels.map((text_label, labelIndex) => {
          return (
            <AnswerInputField
              large={text_label.large ?? false}
              key={`${labelIndex}:sub_text_label`}
              index={labelIndex}
              inputType={text_label.input_type ? text_label.input_type : "text"}
              label={text_label.label}
              placeholder={text_label.placeholder}
              onChange={(text) => {}}
            />
          );
        })}
      </div>
    </>
  );
};

export const Question = ({
  index,
  question,
  onChange,
  questionBottomWidget = null,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    question.choice_type == "radio"
      ? null
      : Array(question.choices.length).fill(false)
  );

  const handleCheckboxChange = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option));
    } else {
      setSelectedOption([...selectedOption, option]);
    }
  };

  return (
    <>
      <div key={`${index}:questions`}>
        <ol>
          <li
            value={question.question_number}
            style={{
              fontWeight: "600",
            }}
          >
            {" "}
            <p className={styles.questiontext}>{question.question}</p>
          </li>
        </ol>
        {questionBottomWidget}
        <div
          className={
            question.choice_orientation == "horizontal"
              ? styles.option_container_horizontal
              : styles.option_container
          }
        >
          {question.choices.map((option, choiceIndex) => {
            if (question.choice_type == "radio") {
              return (
                <AnswerRadioButtonField
                  key={`${choiceIndex}:r_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);
                  }}
                />
              );
            } else {
              return (
                <AnswerCheckboxField
                  key={`${choiceIndex}:c_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    handleCheckboxChange(option);
                  }}
                />
              );
            }
          })}
        </div>

        {/* Sub Question*/}
        {question.has_condition &&
        (selectedOption == "No" ||
          selectedOption == "Don't know" ||
          !selectedOption) ? (
          <></>
        ) : question.sub_questions ? (
          question.sub_questions.map((sub_question, subIndex) => {
            return (
              <SubQuestion
                key={`${subIndex}-${sub_question}`}
                index={subIndex}
                question={sub_question}
                onChange={() => {}}
              />
            );
          })
        ) : null}

        {/* Input Field */}
        {question.has_condition &&
        (selectedOption == "No" ||
          selectedOption == "Don't know" ||
          !selectedOption) ? (
          <></>
        ) : (
          question.text_labels.map((text_label, labelIndex) => {
            return (
              <AnswerInputField
                key={`${labelIndex}:text_label`}
                inputType={
                  text_label.input_type ? text_label.input_type : "text"
                }
                large={text_label.large}
                index={labelIndex}
                label={text_label.label}
                placeholder={text_label.placeholder}
                onChange={(text) => {
                  console.log(selectedOption);
                }}
              />
            );
          })
        )}

        {/* File */}
        {(question.show_on_no == undefined || question.show_on_no == true) &&
        question.has_condition &&
        selectedOption ? (
          selectedOption == "Yes" ? (
            question.has_file ? (
              <UploadButton label={"Upload your GHG Emissions report here"} />
            ) : (
              <></>
            )
          ) : (
            <div
              style={{
                backgroundColor: "#F9FAFC",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "500",
                minHeight: "140px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <p>Get Your GHG emission certificate</p>

              <a
                className={styles.link}
                href="https://businessclimatehub.uk"
                target="_blank"
              >
                businessclimatehub.uk
                <SquareArrowOutUpRight size={15} />
              </a>
              <a
                className={styles.link}
                href="https://www.clustercollaboration.eu/"
                target="_blank"
              >
                clustercollaboration.eu
                <SquareArrowOutUpRight size={15} />
              </a>
              <a
                className={styles.link}
                href="https://smeclimatehub.org/"
                target="_blank"
              >
                smeclimatehub.org
                <SquareArrowOutUpRight size={15} />
              </a>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};
