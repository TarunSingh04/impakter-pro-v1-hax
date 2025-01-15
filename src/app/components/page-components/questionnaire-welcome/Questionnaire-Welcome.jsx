"use client";
import { Divider } from "@mui/joy";
import styles from "./styles.module.scss";
import { PrimaryButton } from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import Image from "next/image";
import EnvironmentalPicture from "@/app/components/assets/EnvironmentalPicture.png";
import SocialPicture from "@/app/components/assets/SocialPicture.png";
import GovernancePicture from "@/app/components/assets/GovernancePicture.png";
import { MdError, MdErrorOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';

const QuestionnaireWelcome = () => {
    const router = useRouter();
  return (
    <>
      <div>
        <div className={styles.outer_question_container}>
        <Navbar/>
          <div className={styles.question_container}>
            
            <div>
              <p className={styles.headertext}>ESG Questionnaire</p>
              <p className={styles.subheadertext} style={
                {}
              }>
                The ESG Performance Meta-Evaluation Questionnaire is a tool
                designed to assess your company’s progress toward
                sustainability, aligned with UN guidelines and EU regulations
                like the Corporate Sustainability Reporting Directive.
              </p>

              {/* Divider */}
              <Divider />

              <p className={styles.headertext2} style={
                {
                    marginTop: "20px"
                }
              }>
                It is divided into three sections:
              </p>

              <div className={styles.detail_container}>
                <div className={styles.row}>
                  <Image
                    src={EnvironmentalPicture}
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                    alt="none"
                  />
                  <div className={styles.column}>
                    <p className={styles.heading}>Environmental</p>
                    <p className={styles.subheading}>
                      Evaluates your company’s environmental impact, including
                      carbon footprint, pollution management, waste reduction,
                      and resource usage.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.detail_container}>
                <div className={styles.row}>
                  <Image
                    src={SocialPicture}
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                    alt="none"
                  />
                  <div className={styles.column}>
                    <p className={styles.heading}>Social</p>
                    <p className={styles.subheading}>
                      Assesses interactions with employees, customers,
                      communities, and human rights practices.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.detail_container}>
                <div className={styles.row}>
                  <Image
                    src={GovernancePicture}
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                    alt="none"
                  />
                  <div className={styles.column}>
                    <p className={styles.heading}>Governance</p>
                    <p className={styles.subheading}>
                      Reviews business ethics and corporate management.
                    </p>
                  </div>
                </div>
              </div>

              <Divider />

              <div className={styles.row} style={
                {
                    backgroundColor: "#fafafa",
                    borderRadius: "10px",
                    margin: "10px 0",
                    padding: "10px",
                    gap: "20px"

                }
              }>
                <MdErrorOutline size={40}/>
                <p className={styles.subheading}>
                  Make sure that the information you provide is as accurate as
                  possible. This will ensure that the ESG Progress Report and
                  Action Plan you get are tailored to your needs.
                </p>
              </div>

              {/* Next Button */}
              <PrimaryButton onClick={() => {
                router.push("/pages/environment");
              }} label={"START QUESTIONNAIRE"} />
            </div>

            {/* Progress */}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireWelcome;
