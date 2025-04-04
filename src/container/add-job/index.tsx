"use client";
import React, { useContext } from "react";
import DropDownInput from "@/component/input/dropDown";
import DateInput from "@/component/input/dateInput";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import "./style.css";
import Input from "@/component/input/inputText";

const AddJobContainer = () => {
  const { userJob, handleUserJobChange } = useContext(
    AdminContext
  ) as AdminContextType;

  const statusOptions = ["Applied", "Interview", "Offer", "Rejected", "Completed"];
  const jobTypeOptions = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];

  return (
    <div className="page-container">
      <div className="addjob-container">
        <h2>Add New Job</h2>

        <div className="form-grid">
          <Input
            labelName="Job Title"
            value={userJob.title}
            onChange={(value) => handleUserJobChange("title", value)}
            type="text"
            arialLabel="e.g. Backend Developer"
          />
          <DropDownInput
            label="Status"
            options={statusOptions}
            value={userJob.status}
            onChange={(value) => handleUserJobChange("status", value)}
          />
          <DropDownInput
            label="Job Type"
            options={jobTypeOptions}
            value={userJob.jobType}
            onChange={(value) => handleUserJobChange("jobType", value)}
          />
          <DateInput
            labelName="Date Applied*"
            value={userJob.date ? new Date(userJob.date).toISOString().slice(0, 16) : ""}
            onChange={(value) => handleUserJobChange("date", value)}
          />
          <Input
            labelName="Salary (Optional)"
            value={userJob.salary ?? ""}
            onChange={(value) => handleUserJobChange("salary", value)}
            type="text"
            arialLabel="e.g. $80,000"
          />
        </div>

        <Input
          labelName="Job Description"
          value={userJob.notes ?? ""}
          onChange={(value) => handleUserJobChange("notes", value)}
          type="textarea"
          arialLabel="Enter job description"
          className="textarea-size"
        />

        <div className="addjob-btn-container">
          <button className="job-btn cancel-btn">Cancel</button>
          <button className="job-btn save-btn">Save Job</button>
        </div>
      </div>
    </div>
  );
};

export default AddJobContainer;
