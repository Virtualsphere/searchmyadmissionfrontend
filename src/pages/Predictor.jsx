import { useState } from "react";
import config from "../config/config";
import { BASE_URL } from "../url/BaseUrl";

export default function Predictor() {
  const [type, setType] = useState("btech");
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

      if (config[type].showRegion) payload.region = region;

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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-blue-900 text-white py-4 px-4 sm:px-6 flex justify-between items-center">
        <div className="font-bold text-base sm:text-lg">🎓 IP University</div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {results.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-8 sm:py-10 text-center rounded-xl mb-6 shadow">
              <h2 className="text-xl sm:text-3xl font-bold mb-2 px-2">
                IP University College Predictor 2026
              </h2>
              <p className="text-sm sm:text-base text-blue-100 px-2">
                Enter your details to find the best IPU colleges you can get.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-100">
              <div className="space-y-4">
                <select className="w-full p-3 border rounded-lg" value={type} onChange={(e) => { setType(e.target.value); setCourse(""); }}>
                  <option value="btech">BTech</option>
                  <option value="bca">BCA</option>
                  <option value="bba">BBA</option>
                  <option value="llb">LLB</option>
                </select>

                <input className="w-full p-3 border rounded-lg" value={config[type].exam} disabled />

                <input className="w-full p-3 border rounded-lg" type="number" placeholder="Enter Rank" value={rank} onChange={(e) => setRank(e.target.value)} />

                <select className="w-full p-3 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Category</option>
                  {config[type].categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>

                {config[type].showRegion && (
                  <div>
                    <p className="mb-2 text-sm sm:text-base">Are you from Delhi Region?</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <label>
                        <input type="radio" value="delhi" checked={region === "delhi"} onChange={(e) => setRegion(e.target.value)} /> Yes
                      </label>
                      <label>
                        <input type="radio" value="outside" checked={region === "outside"} onChange={(e) => setRegion(e.target.value)} /> No
                      </label>
                    </div>
                  </div>
                )}

                <select className="w-full p-3 border rounded-lg" value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="">Select Course</option>
                  {config[type].courses.map((c, i) => (
                    <option key={i} value={typeof c === "string" ? c : c.value}>
                      {typeof c === "string" ? c : c.label}
                    </option>
                  ))}
                </select>

                <input className="w-full p-3 border rounded-lg" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <button onClick={predict} className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold shadow">
                  {loading ? "Predicting..." : "Predict My Colleges"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Info Bar */}
            <div className="bg-white shadow-md border rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center text-sm">
              <div className="flex flex-wrap gap-2">
                <span><b>Rank:</b> {rank}</span>
                <span>|</span>
                <span><b>Category:</b> {category}</span>
                <span>|</span>
                <span><b>Course:</b> {course}</span>
                <span>|</span>
                <span><b>Region:</b> {region}</span>
              </div>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                HIGH ACCURACY
              </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-x-auto border relative">
              <table className="min-w-[600px] w-full">
                <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm">
                  <tr>
                    <th className="p-3 sm:p-4 text-left">College</th>
                    <th className="p-3 sm:p-4">Round</th>
                    <th className="p-3 sm:p-4">Category</th>
                    <th className="p-3 sm:p-4">Rank Range</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b hover:bg-blue-50 text-xs sm:text-sm">
                      <td className="p-3 sm:p-4 font-medium">{r.institute}</td>
                      <td className="p-3 sm:p-4">{r.round}</td>
                      <td className="p-3 sm:p-4">{r.category}</td>
                      <td className="p-3 sm:p-4">{r.minRank} - {r.maxRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!paid && results.length > 4 && (
                <div className="absolute inset-0 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 text-center p-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">🔒 Unlock Full Results</h3>
                  <p className="text-xs sm:text-sm mb-4 text-gray-600">Get complete college list based on your rank</p>
                  <button
                    onClick={() => {
                      window.location.href = `/unlock?type=${type}&rank=${rank}&category=${category}&region=${region}&course=${course}&exam=${config[type].exam}&email=${email}`;
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base"
                  >
                    Pay ₹49
                  </button>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 sm:p-10 rounded-xl text-center shadow-lg mt-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Need Help with IPU Counselling?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">Book Free Counselling</button>
                <button className="border border-white px-6 py-2 rounded-lg">Apply Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
