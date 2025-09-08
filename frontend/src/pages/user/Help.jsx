import React from "react";

const Help = () => {
  return (
     <div className="min-h-screen flex items-center justify-center  ">

    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-yellow-100 rounded-2xl shadow-lg mt-4 sm:mt-6 lg:mt-10">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
        📘 Help & User Guide
      </h1>

      {/* Section 1 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-blue-600">
          1️⃣ Uploading an Excel File
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-sm sm:text-base">
          <li>Go to the <strong>Upload</strong> page.</li>
          <li>Click <strong>Choose File</strong> and select an Excel file (.xls or .xlsx).</li>
          <li>Press <strong>Upload</strong> to start. A success message will confirm upload.</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-yellow-600">
          2️⃣ AI Summary Feature
        </h2>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          After uploading, our AI will process your Excel data and create a short summary.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-sm sm:text-base">
          <li>If you’re using OpenAI, make sure your API key is active and has quota.</li>
          <li>If you’re using Ollama (free), ensure Ollama is running on your system.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-green-600">
          3️⃣ Troubleshooting
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-sm sm:text-base">
          <li><strong>“No summary available”</strong> → The AI couldn’t process the file. Try re-uploading.</li>
          <li><strong>API Error</strong> → Check if OpenAI or Ollama is running.</li>
          <li>For Excel parsing errors, ensure your file is correctly formatted.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-purple-600">
          4️⃣ Need More Help?
        </h2>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          Contact our support team at{" "}
          <a
            href="mailto:support@excelanalytics.com"
            className="text-blue-500 underline"
          >
            support@balrajbala50@gmail.com
          </a>.
        </p>
      </section>
    </div>
    </div>

  );
};

export default Help;
