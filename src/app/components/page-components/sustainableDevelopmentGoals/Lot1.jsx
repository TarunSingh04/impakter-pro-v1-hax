import { QUESTION_SET_1, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { PrimaryButton } from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import { SearchableDropdown } from "../../utilities/components/questionnaire/inputfields/inputfields";
import { SkipForward } from "lucide-react";
import { useState } from "react";
import { AnswerInputField } from "../../utilities/components/questionnaire/inputfields/inputfields";

function Lot1(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showTextFields, setShowTextFields] = useState(false);

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={3} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(0);
            }}
            onSave={() => {}}
          />

          <div className={styles.question_container}>
            <div>
              <p className={styles.headertext}>Sustainable development goals</p>
              <p className={styles.subheadertext}>
                Please provide detailed information about your company`&apos;`s
                SDG
              </p>
              <p className={styles.subheadertext}>
                For more details on SDGs{" "}
                <a href="https://www.un.org/sustainabledevelopment/news/communications-material/" style={{ color: "blue", textDecoration: "none" }} target="_blank">
                  Click Here
                </a>
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}

              <SearchableDropdown
                options={QUESTION_SET_1.choices}
                sdgImages={QUESTION_SET_1.images}
                onChange={(options) => {
                  setSelectedOptions(options);

                  if (options.length === 0) {
                    setShowTextFields(false);
                  }
                }}
                onClick={() => {
                  if (selectedOptions.length > 0) {
                    setShowTextFields(true);
                  }
                }}
              />

            
              {/* Next Button */}
              {showTextFields && (
                <PrimaryButton onClick={() => {
                  props.onSubmit(1);
                }} label={"NEXT PAGE"} />
              )}

              {/* GAP */}
              <div style={{ height: "5px" }}></div>

              {/* Skip */}
              <PrimaryButton
                outlined={true}
                onClick={() => {
                  props.onSubmit(1);
                }}
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      SKIP STEP
                    </p>{" "}
                    <span style={{ marginLeft: "5px" }}>
                      <SkipForward size={16} />
                    </span>
                  </div>
                }
              />
            </div>

            {/* Progress */}

            <ProgressBar
                progress={30}
                label={"Sustainable development goals - STEP 1"}
              />
          </div>
        </div>
      </QuestionLayout>
    </>
  );
}

export default Lot1;
