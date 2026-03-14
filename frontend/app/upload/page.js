"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    alert("Resume uploaded");
  };

  return (
    <div style={{padding:"40px"}}>
      <h1>Upload Resume</h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}
