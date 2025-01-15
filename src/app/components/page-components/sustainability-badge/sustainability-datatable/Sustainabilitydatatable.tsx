import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import verifiedLogo from "../../../assets/Verified.svg";
import pendingLogo from "../../../assets/Pending.svg";
import verifiedLogo2 from "../../../assets/vv.svg";
import pendingLogo2 from "../../../assets/pp.svg";
import noteligibleLogo2 from "../../../assets/ne.svg";
import Dot from "../../../assets/scoredot.svg";
import LocationImg from "../../../assets/locationImg.svg";



const Sustainabilitydatatable: React.FC<any> = ({overallScore}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const getRating = () => {
    if (overallScore >= 90) {
      return "A";
    } else if (overallScore >= 75) {
      return "B";
    } else if (overallScore >= 55) {
      return "C";
    } else if (overallScore >= 25) {
      return "D";
    } else {
      return "F";
    }
  };

  const [Sustainability_data,setSustainability_data] = useState([
    {
      publicationDate: new Date().toLocaleDateString(), // Current date in dd/mm/yyyy format
      validUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toLocaleDateString(), // Current date + 1 year
      score: getRating(),
      overallScore: overallScore,
    }
  ]);

  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    if (!sortColumn) return Sustainability_data;
  
    return [...Sustainability_data].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [Sustainability_data, sortColumn, sortDirection]);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);  

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="Tablecontainer">
      <div className={styles.dataTableContainer}>
        <div className={styles.companyHeader}>
          <p>Apple</p>
          <Image
            src={Dot}
            width={6}
            height={6}
            alt="none"
            className={styles.dotIcon}
          />
          <div className={styles.Location}>
            <Image src={LocationImg} width={16} height={16} alt="none" />
            <p>GERMANY</p>
          </div>
        </div>
        <table className={styles.dataTable}>
          <thead className={styles.theadUtility}>
            <tr>
              <th>Badge</th>
              <th
                onClick={() => handleSort("publicationDate")}
                className={styles.sortable}
              >
                Publication{" "}
                {sortColumn === "publicationDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("validUntil")}
                className={styles.sortable}
              >
                Valid Until{" "}
                {sortColumn === "validUntil" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("score")}
                className={styles.sortable}
              >
                Score{" "}
                {sortColumn === "score" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("overallScore")}
                className={styles.sortable}
              >
                Overall%{" "}
                {sortColumn === "overallScore" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: any, index: any) => (
              <tr key={index} className={styles.tableRows}>
                <td className={styles.parentContainer}>
                  <Image
                    src={item.overallScore > 74 ? verifiedLogo2 : noteligibleLogo2}
                    width={120}
                    height={120}
                    alt="none"
                  />
                 {item.overallScore > 74 && <div className={styles.childContainer}>
                    {new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                      .toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </div>}
                </td>
                <td>{item.publicationDate}</td>
                <td>{item.validUntil}</td>
                <td>{item.score}</td>
                <td>{item.overallScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.prevbtn}
          >
            <span>{"<"}</span> PREVIOUS
          </button>
          <span className={styles.pageDisplay}>
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.nextbtn}
          >
            NEXT PAGE <span>{">"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sustainabilitydatatable;
