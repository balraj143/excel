import React, { useState } from "react";

const AdminSupport = () => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Replace with actual email or support ticket logic
    console.log("Support Form Submitted:", form);
    alert("Your message has been submitted.");
    setForm({ subject: "", message: "" });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">🛠️ Admin Support Center</h1>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">📌 Frequently Asked Questions</h2>
        <div className=" bg-yellow-100 rounded-lg p-4 shadow">
          <p className="font-medium">Q: How do I view uploads by a user?</p>
          <p>A: Go to the Upload History and click on a user's name to view their files.</p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4 shadow">
          <p className="font-medium">Q: How do I delete a user or file?</p>
          <p>A: Navigate to Manage Users or Upload History. Use the delete icon next to each item.</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-yellow-100 border rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">📨 Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Optional AI Assistant */}
      <div className="bg-yellow-100 border-t p-3">
        <h2 className="text-xl font-semibold mb-2">🤖 Ask AI Assistant</h2>
        <p className="text-sm text-gray-600 mb-4">
          Coming soon: Chat with AI to get instant help on admin tools.
        </p>
        {/* Future AI component here */}
        {/* <AiSupportAssistant context="admin" /> */}
      </div>
    </div>
  );
};

export default AdminSupport;
