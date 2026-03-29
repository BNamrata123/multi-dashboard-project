import { useState } from "react";
import axios from "axios";

function AddDataset() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:5000/upload", formData)
      .then(() => {
        alert("File uploaded successfully: " + file.name);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">
        <h2 className="mb-3">Upload Dataset</h2>

        <p style={{ color: "gray" }}>
          Upload a CSV file to update your dashboard data automatically.
        </p>

        <input
          type="file"
          className="form-control mt-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-primary mt-3"
          onClick={handleUpload}
        >
          Upload File
        </button>
      </div>

    </div>
  );
}

export default AddDataset;