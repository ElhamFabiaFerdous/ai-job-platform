"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const ext = selected.name.split(".").pop().toLowerCase();
      if (ext !== "pdf" && ext !== "doc" && ext !== "docx") {
        setMessage("❌ শুধু PDF বা DOC ফাইল আপলোড করা যাবে!");
        setFile(null);
        return;
      }
      setFile(selected);
      setMessage("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setMessage("❌ আগে একটা ফাইল select করো!"); return; }
    setLoading(true);
    setMessage("⏳ রিজিউমি আপলোড হচ্ছে...");
    setTimeout(() => {
      setMessage("✅ রিজিউমি সফলভাবে আপলোড হয়েছে! AI স্কিল বিশ্লেষণ করছে...");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 pt-6">
          <h1 className="text-3xl font-bold text-white">📄 রিজিউমি আপলোড</h1>
          <button onClick={() => router.push("/dashboard")}
            className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 px-4 py-2 rounded-lg text-sm transition">
            ← ড্যাশবোর্ড
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-2">আপনার রিজিউমি আপলোড করুন</h2>
          <p className="text-blue-300 text-sm mb-6">PDF বা DOC ফরম্যাটে আপলোড করুন — AI স্বয়ংক্রিয়ভাবে আপনার স্কিল বিশ্লেষণ করবে</p>

          {message && (
            <div className={`px-4 py-3 rounded-lg mb-4 text-sm ${message.includes("❌") ? "bg-red-500/20 border border-red-400 text-red-300" : message.includes("✅") ? "bg-green-500/20 border border-green-400 text-green-300" : "bg-blue-500/20 border border-blue-400 text-blue-300"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-white/30 hover:border-blue-400 rounded-xl p-8 text-center transition cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}>
              <div className="text-5xl mb-3">📎</div>
              {file ? (
                <div>
                  <p className="text-white font-semibold">{file.name}</p>
                  <p className="text-blue-300 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-semibold">ফাইল select করতে ক্লিক করুন</p>
                  <p className="text-blue-300 text-sm mt-1">PDF, DOC, DOCX সাপোর্টেড</p>
                </div>
              )}
              <input id="fileInput" type="file" accept=".pdf,.doc,.docx"
                onChange={handleFileChange} className="hidden" />
            </div>

            {/* File Info */}
            {file && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-blue-300 text-xs mb-2">Selected File:</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{file.name}</p>
                    <p className="text-blue-300 text-xs">{file.type || "document"}</p>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading || !file}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition">
              {loading ? "⏳ আপলোড হচ্ছে..." : "🚀 রিজিউমি আপলোড করুন"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 bg-white/5 rounded-xl p-4">
            <p className="text-blue-300 text-xs font-semibold mb-2">AI কী করবে?</p>
            <ul className="text-blue-200 text-xs space-y-1">
              <li>✅ আপনার স্কিল বের করবে</li>
              <li>✅ শিক্ষাগত যোগ্যতা বিশ্লেষণ করবে</li>
              <li>✅ কাজের অভিজ্ঞতা চিহ্নিত করবে</li>
              <li>✅ জব রেকমেন্ডেশন দেবে</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}