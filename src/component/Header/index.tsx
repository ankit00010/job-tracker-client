"use client";
import React, { useState } from "react";
import "./style.css";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const jobSuggestions: string[] = [
  "Software Engineer",
  "Product Manager",
  "Data Analyst",
  "UX Designer",
  "Backend Developer",
  "Frontend Developer",
];

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredJobs([]);
    } else {
      const results = jobSuggestions.filter((job) =>
        job.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(results);
      setSelectedIndex(-1); // Reset selection
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredJobs.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < filteredJobs.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        setSearchQuery(filteredJobs[selectedIndex]);
        setFilteredJobs([]);
      }
    }
  };

  const handleSelect = (job: string) => {
    setSearchQuery(job);
    setFilteredJobs([]);
  };

  return (
    <div className="header">
      <h2>Job Tracker</h2>
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {filteredJobs.length > 0 && (
          <ul className="search-dropdown">
            {filteredJobs.map((job, index) => (
              <li
                key={index}
                className={index === selectedIndex ? "selected" : ""}
                onClick={() => handleSelect(job)}
              >
                {job}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <RxCross1 size={24} color="white" />
        ) : (
          <IoIosMenu size={24} color="white" />
        )}
      </div>
      <div className={`button-group ${isMenuOpen ? "open" : ""}`}>
        <button className="board-view-btn btn">Board View</button>
        <button className="list-view-btn btn">List View</button>
        <button
          className="add-job-btn btn"
          onClick={() => router.push("/add-job")}
        >
          + Add Job
        </button>
      </div>
    </div>
  );
};

export default Header;
