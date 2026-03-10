import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BASE_URL } from "../url/BaseUrl";

export default function BTECHPage() {

  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [allResults, setAllResults] = useState([]);

  const downloadPDF = async () => {

    const element = document.getElementById("result-section");
    if (!element) return;

    // Clone element so UI isn't affected
    const clone = element.cloneNode(true);

    clone.style.background = "#ffffff";
    clone.style.color = "#000000";
    clone.style.padding = "20px";

    // Remove Tailwind gradient classes
    clone.querySelectorAll("*").forEach((el) => {
      el.style.background = "transparent";
      el.style.color = "#000";
      el.style.borderColor = "#ddd";
      el.style.boxShadow = "none";
    });

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageHeight = 297;
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("btech-college-prediction.pdf");
  };

  useEffect(() => {
    const paid = localStorage.getItem("paid_btech");
  
      if (paid === "true") {
        setIsPaid(true);
        setResults(allResults);
      }
  }, [allResults]);

  const predictColleges = async () => {

    if (!rank) {
      setError("Please enter your rank");
      return;
    }

    setError("");
    setLoading(true);
    setResults([]);

    try {

      const res = await fetch(`${BASE_URL}/api/btech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rank: Number(rank),
          category
        })
      });

      const data = await res.json();

      if (data.success) {
        setAllResults(data.results);
        setResults(data.results.slice(0, 5));
      } else {
        setError("No colleges found for this rank");
      }

    } catch {
      setError("Server error");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-50 py-12 flex justify-center">

      <div
      className="bg-white shadow-md border border-gray-200 rounded-lg p-12"
      style={{ width: "794px", minHeight: "1123px" }}>

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          AKTU BTech Counselling College Predictor 2026 | Know Your College & Counselling Round
        </h1>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          AKTU BTech Counselling 2026 is a crucial step for students seeking admission into engineering colleges affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU), Uttar Pradesh. With multiple counselling rounds, category-wise cutoffs, and hundreds of participating colleges, students often feel confused while filling choices.
        </p>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          To simplify this process, SearchMyAdmission presents the AKTU BTech Counselling College Predictor 2026, a smart and data-driven tool that helps you predict:
        </p>

        <ul className="list-disc space-y-2 mb-8">
          <li>✔ Which AKTU colleges you can get</li>
          <li>✔ Best possible BTech branch</li>
          <li>✔ Expected counselling round (R1–R6)</li>
          <li>✔ High chance vs borderline colleges</li>
          <li>✔ Category-wise accurate resultst</li>
        </ul>

        <p className="text-center text-gray-600 mb-6 leading-relaxed">
          Use the AKTU BTech Counselling College Predictor 2026 to plan smartly, avoid mistakes, and maximize your chances.
        </p>

        <p className="text-gray-600">
          👉 Predict now. Choose wisely.
        </p>

        {/* HEADER */}
        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
            🎓 AKTU BTech Counselling Predictor
          </h2>

          <p className="text-gray-600 mt-2">
            Smart college prediction based on previous counselling rounds
          </p>

        </div>

        {/* FORM CARD */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="grid md:grid-cols-2 gap-6">

            {/* Rank */}
            <div>
              <label className="text-sm text-gray-600">Your JEE Rank</label>

              <input
                type="number"
                placeholder="Enter your rank"
                value={rank}
                onChange={(e)=>setRank(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-600">Category</label>

              <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400"
              >
                <option className="text-black" value="OPEN(All India)">OPEN(All India)</option>
                <option className="text-black" value="OPEN(Home State)">OPEN(Home State)</option>
                <option className="text-black" value="OPEN(Girl)">OPEN(Girl)</option>
                <option className="text-black" value="OPEN(TF)">OPEN (TF)</option>
                <option className="text-black" value="BC">BC</option>
                <option className="text-black" value="BC(Girl)">BC(Girl)</option>
                <option className="text-black" value="EWS">EVS</option>
                <option className="text-black" value="EWS(Girl)">EWS(Girl)</option>
                <option className="text-black" value="SC">SC</option>
                <option className="text-black" value="SC(Girl)">SC(Girl)</option>
                <option className="text-black" value="ST">ST</option>
                <option className="text-black" value="ST(Girl)">ST(Girl)</option>
              </select>
            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={predictColleges}
            className="w-full mt-8 py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition transform rounded-xl font-semibold shadow-lg"
          >
            <Search size={18} />
            Predict Colleges
          </button>

          {/* Loading */}

          {loading && (
            <p className="text-center mt-6 text-gray-300">
              Loading colleges...
            </p>
          )}

          {/* Error */}

          {error && (
            <p className="text-red-400 text-center mt-5 font-semibold">
              {error}
            </p>
          )}

        </div>

        {isPaid && (

          <button
            onClick={downloadPDF}
            className="mt-6 px-6 py-3 bg-teal-500 rounded-xl"
          >
            Download PDF Report
          </button>

        )}

        {/* RESULTS */}

        {results.length > 0 && (

          <div id="result-section" className="mt-12">

            <h2 className="text-2xl font-semibold mb-6 text-teal-300">
              Colleges & Branches You May Get
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {(isPaid ? allResults : results).map((college, index)=>(

                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg hover:scale-105 transition transform shadow-xl"
                >

                  <h3 className="text-lg font-semibold">
                    {college.college}
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-3 text-sm">

                    <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full">
                      {college.branch}
                    </span>

                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
                      Rank {college.openingRank} - {college.closingRank}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {!isPaid && allResults.length > 5 && (

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400 text-center">

            <h3 className="text-xl font-semibold mb-2">
              🔒 Unlock Full College Prediction
            </h3>

            <p className="text-gray-300 mb-4">
              View all predicted colleges, counselling round insights, and download your result as PDF.
            </p>

            <button
              onClick={() => window.location.href="/unlock?course=btech"}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Unlock Full Report
            </button>

          </div>

        )}

        {/* INFORMATION SECTION */}

        <div className="mt-16 text-gray-600 space-y-4">

          <p>
            <strong className="text-blue-600">What is AKTU BTech Counselling 2026?</strong>
          </p>

          <p>
            AKTU conducts centralized BTech counselling based on JEE Main AIR (CRL). Admissions are offered through multiple rounds including:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Round 1</li>
            <li>Round 2</li>
            <li>Round 3</li>
            <li>Round 4</li>
            <li>Round 5</li>
            <li>Special / Mop-up Round</li>
          </ul>

          <p>
            Seat allotment depends on:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>JEE Main rank</li>
            <li>Category (OPEN, EWS, BC, SC, ST, Girls, TF, etc.)</li>
            <li>Home State / All India quota</li>
            <li>Branch preference</li>
            <li>Previous year cutoffs</li>
          </ul>

          <p>
            <strong className="text-blue-600">Why Use AKTU BTech College Predictor 2026?</strong>
          </p>

          <p>
            Most students lose good colleges because they:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Don’t understand round-wise closing ranks</li>
            <li>Fill choices randomly</li>
            <li>Depend on guesswork or YouTube predictions</li>
            <li>Miss upgrade opportunities</li>
          </ul>

          <p>
            Our AKTU College Predictor helps you plan counselling smartly, not blindly.
          </p>

          <p>
            <strong className="text-blue-600">Key Benefits</strong>
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Based on official previous AKTU counselling data</li>
            <li>Covers all counselling rounds</li>
            <li>Category-wise prediction accuracy</li>
            <li>Branch-wise filters (CSE, IT, AI, ECE, Mechanical, Civil, etc.)</li>
            <li>Shows Best Cutoff + Expected Round</li>
            <li>Highlights High Chance / Borderline options</li>
          </ul>

          <p>
            <strong className="text-blue-600">How to Use AKTU BTech Counselling Predictor?</strong>
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Enter your JEE Main AIR (CRL)</li>
            <li>Select your category</li>
            <li>Click Predict Colleges</li>
            <li>Filter by branch if needed</li>
            <li>View colleges with:
              <ul>
                <li>Best cutoff rank</li>
                <li>Expected counselling round</li>
                <li>Admission probability</li>
              </ul>
            </li>
          </ul>

          <p>
            <strong className="text-blue-600">Categories Covered in AKTU Counselling</strong>
          </p>

          <p>
            This predictor supports all major AKTU categories:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>OPEN (All India)</li>
            <li>OPEN (Home State)</li>
            <li>OPEN (Girl)</li>
            <li>OPEN (Tuition Fee Waiver – TF)</li>
            <li>BC / BC (Girl)</li>
            <li>EWS / EWS (Girl)</li>
            <li>SC / SC (Girl)</li>
            <li>ST / ST (Girl)</li>
          </ul>

          <p>
            Each category is processed independently, ensuring accurate predictions.
          </p>

          <p>
            <strong className="text-blue-600">BTech Branches You Can Predict</strong>
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Computer Science & Engineering (CSE)</li>
            <li>Artificial Intelligence (AI)</li>
            <li>Information Technology (IT)</li>
            <li>Electronics & Communication Engineering (ECE)</li>
            <li>Electrical Engineering</li>
            <li>Mechanical Engineering</li>
            <li>Civil Engineering</li>
          </ul>

          <p>
            All sub-branches (AI, FW, specialization-based branches) are auto-matched.
          </p>

          <p>
            <strong className="text-blue-600">Understanding AKTU Counselling Rounds</strong>
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>R1–R2: Strong chances</li>
            <li>R3–R4: Moderate chances</li>
            <li>R5–R6: Borderline / last opportunity</li>
          </ul>

          <p>
            Knowing the expected round helps students:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Decide whether to freeze or float</li>
            <li>Plan upgrades</li>
            <li>Avoid wrong choice locking</li>
          </ul>

          <p>
            <strong className="text-blue-600">Is This AKTU College Predictor Accurate?</strong>
          </p>

          <p>
            While no predictor guarantees admission, this tool is:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Data-backed</li>
            <li>Transparent</li>
            <li>Realistic</li>
            <li>Much more reliable than random lists or guess-based predictions</li>
          </ul>

          <p>
            <strong className="text-blue-600">Who Should Use This Tool?</strong>
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Students appearing in AKTU BTech Counselling 2026</li>
            <li>Drop-year students using JEE Main rank</li>
            <li>Parents planning college options</li>
            <li>Students confused between private and government colleges</li>
          </ul>

          <p>
            <strong className="text-blue-600">Need Help with AKTU Counselling Choice Filling?</strong>
          </p>

          <p>
            If you want:
          </p>

          <ul className="list-disc space-y-2 mb-8">
            <li>Personalized counselling</li>
            <li>Choice filling strategy</li>
            <li>College comparison</li>
            <li>Round-wise upgrade planning</li>
          </ul>

          <p>
            👉 Use the WhatsApp counselling option provided on this page to talk to an AKTU admission expert.
          </p>

        </div>

        {/* FAQ SECTION */}

        <div className="mt-16">

          <h2 className="text-2xl font-bold mb-6 text-blue-600">
            Frequently Asked Questions (FAQs)
          </h2>

          <div className="space-y-4 text-gray-600">

            <p><strong className="text-blue-600">Is this AKTU College Predictor free?</strong><br/>
            Yes, it is completely free to use.</p>

            <p><strong className="text-blue-600">Does it include private AKTU colleges?</strong><br/>
            Yes, it covers government, government-aided, and private AKTU colleges.</p>

            <p><strong className="text-blue-600">Is TF (Tuition Fee Waiver) category supported?</strong><br/>
            Yes, TF category predictions are handled separately.</p>

            <p><strong className="text-blue-600">Can I use this before counselling starts?</strong><br/>
            Yes, it is best used before choice filling.</p>

            <p><strong className="text-blue-600">Does this guarantee admission?</strong><br/>
            No predictor guarantees admission. It helps you make informed decisions.</p>

          </div>

        </div>

      </div>

    </div>

  );

}