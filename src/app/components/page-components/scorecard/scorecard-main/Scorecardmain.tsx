import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import Maincard from "./main-card/Maincard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadIcon from "../../../assets/downloadIcon.svg";
import Image from "next/image";

const Scorecardmain = () => {
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [mainCardImageSrc, setMainCardImageSrc] = useState<string | null>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [escore, setEscore] = useState(0);
  const [sscore, setSscore] = useState(0);
  const [gscore, setGscore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/score`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();
        setEscore(Math.round(data.mean_e_score));
        setSscore(Math.round(data.mean_s_score));
        setGscore(Math.round(data.mean_g_score));
        setOverallScore(Math.round(data.onboarding_score));
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScore();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();
      if (response.ok && data) {
        setCompanyName(data.onboarding.companyName);
        setCountry(data.onboarding.selectedCountry);
      } else {
        console.error(
          "Failed to fetch user data:",
          data?.error ?? "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const renderMainCardAsImage = async () => {
      const mainCardElement = document.getElementById("maincard");
      if (mainCardElement) {
        const canvas = await html2canvas(mainCardElement, { scale: 2 });
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${companyName}-scorecard.png`, {
              type: "image/png",
            });
            setFileInput(file);
            setMainCardImageSrc(URL.createObjectURL(file)); // Set URL for rendering the image
          }
        }, "image/png");
      }
    };
    renderMainCardAsImage();
  }, [companyName]);

  // const downloadPDF = () => {
  //   const sectionIds = ["section1", "section2", "section3"];
  //   const pptWidth = 508; // Width in mm for PowerPoint dimensions (16:9 ratio)
  //   const pptHeight = 286; // Height in mm for PowerPoint dimensions

  //   const pdf = new jsPDF("l", "mm", [pptWidth, pptHeight]);

  //   const renderSectionToPDF = async (id:any, isFirstPage:any) => {
  //     const section = document.getElementById(id);
  //     if (section) {
  //       const canvas = await html2canvas(section, { scale: 2 });
  //       const imgData = canvas.toDataURL("image/png");

  //       // Set the page size to PowerPoint dimensions for every page
  //       if (!isFirstPage) {
  //         pdf.addPage([pptWidth, pptHeight]);
  //       }

  //       // Add image to PDF with the consistent PowerPoint page size
  //       pdf.addImage(imgData, "PNG", 0, 0, pptWidth, pptHeight);
  //     } else {
  //       console.error(`Element with id '${id}' not found.`);
  //     }
  //   };

  //   // Render sections in order
  //   const renderPDF = async () => {
  //     await renderSectionToPDF(sectionIds[0], true);  // First page
  //     await renderSectionToPDF(sectionIds[1], false); // Middle page
  //     await renderSectionToPDF(sectionIds[2], false); // Last page
  //     pdf.save(`${companyName}-scorecard.pdf`);
  //   };

  //   renderPDF();
  // };

  const downloadPDF = () => {
    const sectionIds = ["section1", "section2", "section3"];
    const pptWidth = 410; // Width in mm for PowerPoint dimensions (16:9 ratio)
    const pptHeight = 286; // Height in mm for PowerPoint dimensions

    const pdf = new jsPDF("l", "mm", [pptWidth, pptHeight]);

    const renderSectionToPDF = async (id:any, isFirstPage:any) => {
        const section = document.getElementById(id);
        if (section) {
            // Use html2canvas to render the section
            const canvas = await html2canvas(section, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            // Calculate the aspect ratio of the canvas and fit it to the PDF dimensions
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const imgAspectRatio = imgWidth / imgHeight;

            // Ensure consistent aspect ratio
            let renderedWidth = pptWidth;
            let renderedHeight = pptHeight;

            if (imgAspectRatio > pptWidth / pptHeight) {
                // Fit by width
                renderedHeight = pptWidth / imgAspectRatio;
            } else {
                // Fit by height
                renderedWidth = pptHeight * imgAspectRatio;
            }

            // Center the image in the PDF page
            const offsetX = (pptWidth - renderedWidth) / 2;
            const offsetY = (pptHeight - renderedHeight) / 2;

            // Add page to PDF
            if (!isFirstPage) {
                pdf.addPage([pptWidth, pptHeight]);
            }

            // Add the image to the PDF
            pdf.addImage(imgData, "PNG", offsetX, offsetY, renderedWidth, renderedHeight);
        } else {
            console.error(`Element with id '${id}' not found.`);
        }
    };

    const generatePDF = async () => {
        for (let i = 0; i < sectionIds.length; i++) {
            await renderSectionToPDF(sectionIds[i], i === 0);
        }
        pdf.save(`${companyName}.pdf`);
    };

    generatePDF();
};

  return (
    <div className={styles.Scorecardmain}>
      <div className={styles.downloadbtn}>
        <button onClick={downloadPDF} className={styles.downloadButton}>
          <Image
            src={DownloadIcon}
            height={16}
            width={16}
            alt="Download icon"
            className={styles.downloadIcon}
          />
          Download as PDF
        </button>
      </div>

      {/* Hidden file input to hold the Maincard image */}
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/png"
        // Use File object as a fake value setter since we can't actually set the file input value directly
        onChange={() => {}}
      />

      <div
        style={{
          width: "50%",
          overflow: "hidden",
          position: "absolute",
          zIndex: "-10000000",
          left: "-10000000000",
          top: "-1000000000000000000%",
        }}
      >
        <Maincard
          escore={escore}
          sscore={sscore}
          gscore={gscore}
          overallScore={overallScore}
          name={companyName}
          country={country}
        />
      </div>

      {/* Render captured Maincard image */}
      {mainCardImageSrc ? (
        <Image
          src={mainCardImageSrc}
          alt={`${companyName} Scorecard`}
          layout="responsive"
          width={100}
          height={100}
          className={styles.mainCardImage}
        />
      ) : (
        <div id="maincard">
          <Maincard
            escore={escore}
            sscore={sscore}
            gscore={gscore}
            overallScore={overallScore}
            name={companyName}
            country={country}
          />
        </div>
      )}
    </div>
  );
};

export default Scorecardmain;
