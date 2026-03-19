import { useState } from "react";
import config from "../config/config";
import { BASE_URL } from "../url/BaseUrl";

export default function Predictor() {
  const [type, setType] = useState("bca");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("delhi");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  const [results, setResults] = useState([]);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    if (!rank || !category || !course || !email) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${BASE_URL}/api${config[type].endpoint}`;

      const payload = {
        email,
        exam: config[type].exam,
        rank: Number(rank),
        category,
        course,
      };

      if (config[type].showRegion) {
        payload.region = region;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setResults(data.results || []);
      setPaid(data.paid || false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto p-6">
        {results.length === 0 ? (
          /* INPUT PAGE */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">IP University College Predictor 2026</h2>
              <p className="text-gray-600">Enter your details to find the best IPU colleges you can get.</p>
              <p className="text-sm text-gray-500">Based on previous years' cutoff data.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border">
              <div className="space-y-4">
                {/* Select Exam */}
                <select
                  className="w-full p-3 border rounded-lg bg-white"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setCourse("");
                  }}
                >
                  <option value="btech">BTech</option>
                  <option value="bca">BCA</option>
                  <option value="bba">BBA</option>
                  <option value="llb">LLB</option>
                </select>

                <input
                  className="w-full p-3 border rounded-lg"
                  value={config[type].exam}
                  disabled
                />

                {/* Enter Rank */}
                <input
                  className="w-full p-3 border rounded-lg"
                  type="number"
                  placeholder="Enter Your Rank e.g. 45000"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                />

                {/* Category */}
                <select
                  className="w-full p-3 border rounded-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {config[type].categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>

                {/* Region */}
                {config[type].showRegion && (
                  <div>
                    <p className="mb-2 text-gray-700">Are you from Delhi Region?</p>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="delhi"
                          checked={region === "delhi"}
                          onChange={(e) => setRegion(e.target.value)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="outside"
                          checked={region === "outside"}
                          onChange={(e) => setRegion(e.target.value)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                )}

                {/* Select Course */}
                <select
                  className="w-full p-3 border rounded-lg"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {config[type].courses.map((c, i) => (
                    <option key={i} value={typeof c === "string" ? c : c.value}>
                      {typeof c === "string" ? c : c.label}
                    </option>
                  ))}
                </select>

                {/* Priority 
                <div>
                  <p className="mb-2 text-gray-700">What matters most to you?</p>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="priority" className="mr-2" />
                      Placements
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="priority" className="mr-2" />
                      College Reputation
                    </label>
                  </div>
                </div>
                */}

                {/* Email (hidden in design but needed for functionality) */}
                <input
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />

                {/* Predict Button */}
                <button
                  onClick={predict}
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition duration-200"
                >
                  {loading ? "Predicting..." : "Predict My Colleges"}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="flex justify-center space-x-8 mt-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">📊</span>
                Analyzing 25+ IPU Colleges
              </div>
              <div className="flex items-center">
                <span className="mr-2">📅</span>
                5 Years of Cutoff Data
              </div>
              <div className="flex items-center">
                <span className="mr-2">⚡</span>
                Smart Prediction Engine
              </div>
            </div>
          </div>
        ) : (
          /* RESULTS PAGE */
          <div>

            {/* User Info */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
              <div className="space-x-4">
                <span><span className="font-semibold">Your Rank:</span> {rank}</span>
                <span>|</span>
                <span><span className="font-semibold">Category:</span> {category}</span>
                <span>|</span>
                <span><span className="font-semibold">Course:</span> {course}</span>
                <span>|</span>
                <span><span className="font-semibold">Region:</span> {region === "delhi" ? "Delhi" : "Outside Delhi"}</span>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Prediction Accuracy: HIGH
              </span>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-left">College</th>
                    <th className="p-4 text-left">Expected Round</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => { 
                    return (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{r.institute}</td>
                        <td className="p-4">{r.round}</td>
                        <td className="p-4">{r.category}</td>
                        <td className="p-4">{r.minRank} - {r.maxRank}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Counselling Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Need Help with IPU Counselling?</h3>
              <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Book Free Counselling
                </button>
                <button className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Unlock Full Results */}
            {!paid && results.length > 4 && (
              <div className="fixed bottom-6 right-6 bg-white p-6 rounded-lg shadow-xl border max-w-sm">
                <h3 className="text-lg font-semibold mb-2">🔒 Unlock Full Results</h3>
                <button
                  onClick={() => {
                    window.location.href = `/unlock?type=${type}&rank=${rank}&category=${category}&region=${region}&course=${course}&exam=${config[type].exam}&email=${email}`;
                  }}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Pay ₹49
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}