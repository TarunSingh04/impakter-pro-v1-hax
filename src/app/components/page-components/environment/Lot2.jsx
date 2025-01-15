import { useState } from "react";
import { QUESTION_SET_2, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { SearchableDropdown } from "../../utilities/components/questionnaire/inputfields/inputfields";
import { PrimaryButton } from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";

function Lot2(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showTextFields, setShowTextFields] = useState(false);

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(0);
            }}
            onSave={() => {}}
          />

          <div className={styles.question_container}>
            <div>
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Energy source: fossil fuels or green?
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <SearchableDropdown
                label={"Select Utility Energy Source"}
                subLabel={""}
                options={QUESTION_SET_2.choices}
                checkboxDirection="end"
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
              >
                <>
                  <PrimaryButton
                    outlined={true}
                    hasBorder={false}
                    label={"+ ADD PROVIDER"}
                    onClick={() => {}}
                  />
                </>
              </SearchableDropdown>

              {/* Next Button */}
              <PrimaryButton
                onClick={() => {
                  props.onSubmit(2);
                }}
                label={"NEXT PAGE"}
              />
            </div>

            {/* Progress */}

            <ProgressBar progress={24} label={"ENVIRONMENT - STEP 2"} />
          </div>
        </div>
      </QuestionLayout>
    </>
  );
}

export default Lot2;
