"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
import AIBtn from "../../assets/AiBtn.svg";
import DataIcon from "../../assets/calendarIcon.svg";
import AIDotIcon from "../../assets/AIBtndotIcon.svg";
import MarketplaceLogo from "../../assets/marketplacelogo.svg";
import SubscribedLogo from "../../assets/subscribed.svg";
import { MdClose } from "react-icons/md";
import celebIcon from "../../assets/celebrateIcon.jpg";
import AiassitantLogo from "../../assets/AIassitantLogo.svg";
import dashboardOverflowStore from "../../store/dashboardOverflowStore";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`;

const AIassitant = () => {
  const [subscribed, setsubscribed] = useState(false);
  const [subscribedPopUp, setsubscribedPopUp] = useState(false);
  const [aiActivated, setAiActivated] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state for lazy loading
  const setDashboardOverflow = dashboardOverflowStore(
    (state) => state.setDashboardOverflow
  );

  const suscribe = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/feature/ai_assistant?value=true`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        setsubscribed(true);
        setsubscribedPopUp(true);
        setDashboardOverflow(true);
      } else {
        console.error("Failed to subscribe:", response.statusText);
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  // **Fetch User Data API Call**
  const fetchUserData = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();
      if (response.ok && data) {
        console.log(data?.ai_assistant);
        setAiActivated(data?.ai_assistant ?? false); // Default to false if undefined
        setName(data.name);
        if (data?.ai_assistant) {
          setsubscribed(true);
        }
      } else {
        console.error(
          "Failed to fetch user data:",
          data?.error ?? "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false); // Stop loading once data is fetched
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchUserData();
  }, []);

  const closeSuscribePopUp = () => {
    setsubscribedPopUp(false);
    setDashboardOverflow(false);
  };

  return (
    <div className={styles.Marketplace}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>AI Assitant
        </p>
      </div>
      <div className={styles.sectionsubHeader}>
        <div className={styles.leftsubcont}>
          <div className={styles.leftsubbox}>
            <p>
              Howdy, <span>{name}</span> 👋{" "}
            </p>
            <div className={styles.datecont}>
              <div className={styles.dateIconcont}>
                <Image
                  src={DataIcon}
                  width={18}
                  height={18}
                  alt="none"
                  className={styles.dateIcon}
                />
              </div>
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <span>
            Your Gateway to Sustainable Innovation and Global Change !
          </span>
        </div>
        <button className={styles.AIDotIcon}>
          <Image
            src={AIDotIcon}
            width={16}
            height={16}
            alt="none"
            className={styles.AIdotIco}
          />
          AI ASSISTANT
        </button>
      </div>

      <>
        <div className={styles.marketPlacecont}>
          <Image
            src={AiassitantLogo}
            width={190}
            height={160}
            alt="none"
            className={styles.dateIcon}
          />
          <p className={styles.Headline}>AI Assitant Coming Soon!</p>
          <p className={styles.subHeadline}>
            Your Gateway to Sustainable Innovation and Global Change !
          </p>
          {!isLoading ? (
            <>
              {!subscribed && (
                <button
                  className={styles.subscribebtn}
                  onClick={() => {
                    suscribe();
                  }}
                >
                  Subscribe now
                </button>
              )}
              {subscribed && (
                <Image
                  src={SubscribedLogo}
                  width={220}
                  height={60}
                  alt="none"
                  className={styles.dateIcon}
                />
              )}
            </>
          ) : (
            <p className={styles.Loading}>Loading...</p> // Optional loading state placeholder
          )}
        </div>
      </>

      {subscribedPopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeSuscribePopUp}
                />
              </div>
              <Image
                src={celebIcon}
                width={30}
                height={30}
                alt="none"
                className={styles.dateIcon}
              />
              <h2 className={styles.title}>Congratulations!</h2>
              <p className={styles.description}>
                You&apos;re subscribed to AI Assitant!
              </p>
            </div>

            <div className={styles.buttoncontpopup}>
              <button className={styles.button1} onClick={closeSuscribePopUp}>
                GO BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIassitant;
