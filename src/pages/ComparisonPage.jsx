import { useEffect, useState } from "react";
import { BASE_URL } from "../url/BaseUrl";

export default function ComparisonPage() {
  const [data, setData] = useState([]);
  const [aiVerdict, setAiVerdict] = useState("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bestFit, setBestFit] = useState(null);

  const user = JSON.parse(localStorage.getItem("predictorData"));

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const endpoint = `${BASE_URL}/api/${user.type}/comparison`;

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const result = await res.json();

        const colleges = result?.results?.results || [];
        setData(colleges);
        setAiVerdict(result?.results?.aiVerdict || "");
        setPaid(result?.paid || false);
        
        // Find best fit (first college with Excellent Fit or highest finalScore)
        if (colleges.length > 0) {
          const best = colleges.find(c => c.aiFit === "Excellent Fit") || colleges[0];
          setBestFit(best);
        }
      } catch (error) {
        console.error("Error fetching comparison:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading report...</p>;

  // Helper to render winner badge and tier
  const renderCollegeHeader = (college, idx) => {
    const instituteName = college.institute.split(",")[0];
    const isWinner = idx === 0;
    return (
      <div className="text-center">
        <div className="font-bold text-base">{instituteName}</div>
        {college.collegeTier && (
          <div className="text-xs font-medium mt-0.5 text-gray-600">
            {college.collegeTier}
          </div>
        )}
        {isWinner && paid && (
          <div className="text-xs text-green-600 font-semibold mt-1">🏆 Winner</div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          College Comparison Report
        </h2>
        <p className="text-blue-500 text-sm mt-1">
          Premium AI-powered admission insights & decision analysis
        </p>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <span className="font-semibold">🎓 Student Profile</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <p><span className="font-medium">Rank:</span> {user.rank}</p>
          <p><span className="font-medium">Category:</span> {user.category}</p>
          <p><span className="font-medium">Counselling:</span> {user.exam}</p>
        </div>
      </div>

      {/* AI Best-Fit Recommendation (Paid) */}
      {paid && bestFit && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <span className="text-xl">🧠</span>
            <span className="font-semibold tracking-wide">AI Best-Fit Recommendation</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{bestFit.institute.split(",")[0]}</p>
          <p className="text-sm text-gray-600 mt-0.5">
            {bestFit.collegeTier} | Seat Security: {bestFit.seatSecurity}
          </p>
          <p className="mt-3 text-gray-700 text-sm leading-relaxed border-t border-green-200 pt-3">
            {bestFit.institute} emerges as the best-fit choice due to its strong institutional quality combined with high admission certainty for the given rank.
          </p>
        </div>
      )}

      {/* Paywall */}
      {!paid && (
        <div className="text-center mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <p className="font-medium text-amber-800">
              🔒 Unlock full comparison & AI insights
            </p>
            <p className="text-xs text-amber-600 mt-1">Get access to seat security, AI verdict, and winner analysis</p>
          </div>
          <button
            onClick={() => (window.location.href = "/unlock")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition"
          >
            Unlock Full Report — ₹499
          </button>
        </div>
      )}

      {/* Side-by-Side Comparison Table */}
      <div className={`overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm ${!paid ? "blur-sm pointer-events-none" : ""}`}>
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
              <th className="p-3 text-left font-semibold rounded-tl-lg">Parameter</th>
              {data.map((college, idx) => (
                <th key={idx} className="p-3 text-center font-semibold">
                  {renderCollegeHeader(college, idx)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Admission Probability */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50 text-gray-800">Admission Probability</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center font-mono">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    college.probability >= 80 ? 'bg-green-100 text-green-800' : 
                    college.probability >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {college.probability}%
                  </span>
                </td>
              ))}
            </tr>
            {/* Expected Counselling Round */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Expected Counselling Round</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">{college.expectedRound}</td>
              ))}
            </tr>
            {/* Seat Security */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Seat Security</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">
                  <span className={`inline-flex items-center gap-1 ${
                    college.seatSecurity === 'High' ? 'text-green-700 font-semibold' :
                    college.seatSecurity === 'Medium' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {college.seatSecurity === 'High' && '🟢'}
                    {college.seatSecurity === 'Medium' && '🟡'}
                    {college.seatSecurity === 'Low' && '🔴'}
                    {college.seatSecurity}
                  </span>
                </td>
              ))}
            </tr>
            {/* College Tier */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">College Tier</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center font-medium">{college.collegeTier}</td>
              ))}
            </tr>
            {/* Brand Preference */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Brand Preference</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">{college.brandPreference}</td>
              ))}
            </tr>
            {/* Risk vs Reward */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Risk vs Reward</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">{college.riskReward}</td>
              ))}
            </tr>
            {/* Rank Stability */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Rank Stability</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">{college.rankStability}</td>
              ))}
            </tr>
            {/* Allotment Confidence */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Allotment Confidence</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">
                  <span className={`${
                    college.allotmentConfidence === 'Very High' ? 'text-green-700 font-semibold' : 
                    college.allotmentConfidence === 'High' ? 'text-green-600' : 'text-yellow-700'
                  }`}>
                    {college.allotmentConfidence}
                  </span>
                </td>
              ))}
            </tr>
            {/* Preference Priority */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50">Preference Priority</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center font-medium">{college.preferencePriority}</td>
              ))}
            </tr>
            {/* AI Fit */}
            <tr className="hover:bg-gray-50 transition">
              <td className="p-3 font-medium bg-gray-50 rounded-bl-lg">AI Fit</td>
              {data.map((college, idx) => (
                <td key={idx} className="p-3 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    college.aiFit === 'Excellent Fit' ? 'bg-green-100 text-green-800' :
                    college.aiFit === 'Good Fit' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {college.aiFit}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* AI Verdict (Paid) */}
      {paid && aiVerdict && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-400 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-900 mb-2">
            <span className="text-lg">📊</span>
            <span className="font-semibold tracking-wide">AI Verdict</span>
          </div>
          <p className="text-gray-800 leading-relaxed text-sm">{aiVerdict}</p>
        </div>
      )}
    </div>
  );
}