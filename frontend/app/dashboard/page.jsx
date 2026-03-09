"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) { router.push("/login"); return; }
    setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">⏳ লোড হচ্ছে...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">🎯 SkillBridge</h1>
            <p className="text-blue-300 text-sm">AI-Powered Career Development</p>
          </div>
          <button onClick={handleLogout}
            className="bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-red-300 px-4 py-2 rounded-lg text-sm transition">
            লগআউট
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
              {user.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">স্বাগতম, {user.full_name}! 👋</h2>
              <p className="text-blue-300">{user.email}</p>
              {user.career_goal && (
                <span className="inline-block bg-blue-600/30 border border-blue-500/40 text-blue-200 text-xs px-3 py-1 rounded-full mt-1">
                  🎯 {user.career_goal}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div onClick={() => router.push("/profile")}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-6 cursor-pointer transition">
            <div className="text-3xl mb-3">👤</div>
            <h3 className="text-white font-semibold text-lg mb-1">আমার প্রোফাইল</h3>
            <p className="text-blue-300 text-sm">প্রোফাইল দেখুন ও আপডেট করুন</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-60">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="text-white font-semibold text-lg mb-1">রিজিউমি আপলোড</h3>
            <p className="text-blue-300 text-sm">近く Coming Soon — Module 2</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-60">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-white font-semibold text-lg mb-1">জব রেকমেন্ডেশন</h3>
            <p className="text-blue-300 text-sm">Coming Soon — Module 3</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-60">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-white font-semibold text-lg mb-1">স্কিল গ্যাপ</h3>
            <p className="text-blue-300 text-sm">Coming Soon — Module 3</p>
          </div>
        </div>

      </div>
    </div>
  );
}