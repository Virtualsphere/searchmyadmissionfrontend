import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BASE_URL } from "../url/BaseUrl";

export default function BCABBAPage() {

  const [rank, setRank] = useState("");
  const [course, setCourse] = useState("Bachelor of Computer Applications");
  const [category, setCategory] = useState("general");
  const [region, setRegion] = useState("delhi");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
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
    const paid = localStorage.getItem("paid_bca_bba");
  
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

    try {

      let endpoint = "";

      if (course === "Bachelor of Computer Applications") {
        endpoint = `${BASE_URL}/api/bca`;
      } else if (course === "Bachelor of Business Administration") {
        endpoint = `${BASE_URL}/api/bba`;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rank: Number(rank),
          category,
          region,
          course
        })
      });

      const data = await res.json();

      if (data.success) {
        setAllResults(data.results);
        setResults(data.results.slice(0, 5));
      } else {
        setResults([]);
        setError("No colleges found");
      }

    } catch {
      setError("Server error");
    }

  };

  return (

    <div className="min-h-screen bg-gray-50 py-12 flex justify-center">

      <div
      className="bg-white shadow-md border border-gray-200 rounded-lg p-12"
      style={{ width: "794px", minHeight: "1123px" }}>

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          GGSIPU CET Counselling College Predictor 2026 | Know Your College & Counselling Round
        </h1>

        <p className="text-center text-gray-600 mb-6 leading-relaxed">
          Choosing the right college during GGSIPU CET Counselling 2026 is not just about rank — it is about understanding cutoffs, category rules, region preference, and counselling round behavior.
        </p>

        <p className="text-center text-gray-600 mb-6 leading-relaxed">
          Every year, thousands of IPU CET aspirants miss out on better colleges despite having a competitive rank, simply because they do not accurately predict their round-wise chances or misunderstand Delhi vs Outside Delhi cutoffs.
        </p>

        <p className="text-center text-gray-600 mb-6 leading-relaxed">
          Enter your details below to instantly check your GGSIPU CET 2026 college chances and plan your counselling choices with clarity and confidence.
        </p>

        {/* HEADER */}
        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            🎓 GGSIPU CET Counselling Intelligence Predictor
          </h2>

          <p className="text-black-300 mt-2">
            Multi-course admission analysis with probability, round & seat-risk intelligence
          </p>

        </div>

        {/* FORM CARD */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="grid md:grid-cols-4 gap-6">

            {/* Rank */}
            <div>
              <label className="text-sm text-black-300">Your Rank</label>
              <input
                type="number"
                placeholder="Enter your rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            {/* Course */}
            <div>
              <label className="text-sm text-black-300">Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400"
              >
                <option className="text-black" value="Bachelor of Computer Applications">
                  BCA
                </option>
                <option className="text-black" value="Bachelor of Business Administration">
                  BBA
                </option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-black-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400"
              >
                <option className="text-black" value="general">General</option>
                <option className="text-black" value="obc">OBC</option>
                <option className="text-black" value="ews">EWS</option>
                <option className="text-black" value="sc">SC</option>
                <option className="text-black" value="st">ST</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="text-sm text-black-300">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400"
              >
                <option className="text-black" value="delhi">Delhi</option>
                <option className="text-black" value="outside">Outside Delhi</option>
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

          {/* ERROR */}
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
              Colleges You May Get
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {(isPaid ? allResults : results).map((college, index) => (

                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg hover:scale-105 transition transform shadow-xl"
                >

                  <h3 className="text-lg font-semibold">
                    {college.institute}
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-3 text-sm">

                    <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full">
                      {college.course}
                    </span>

                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
                      Rank {college.minRank} - {college.maxRank}
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

            <p className="text-black-300 mb-4">
              View all predicted colleges, counselling round insights, and download your result as PDF.
            </p>

            <button
              onClick={() => window.location.href="/unlock?course=bca_bba"}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Unlock Full Report
            </button>

          </div>

        )}

        {/* INFORMATION SECTION */}

        <div className="mt-16 text-black-300 space-y-4">

          <p>
            The <strong>GGSIPU CET College Predictor 2026</strong> is designed to solve this exact problem.
          </p>

          <p>
            This advanced counselling predictor analyzes previous year GGSIPU CET cutoffs, category-wise seat allocation, and real counselling trends to help you predict:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Which colleges and courses you can realistically get</li>
            <li>In which counselling round (Round 1, Round 2, Round 3, or Spot Round)</li>
            <li>Based on your rank, category, and region</li>
          </ul>

          <p>
            Unlike generic predictors, this tool focuses on decision accuracy, not guesswork. It helps you shortlist colleges strategically so you can maximize your seat chances and avoid common counselling mistakes.
          </p>

        </div>

        {/* FAQ SECTION */}

        <div className="mt-16">

          <h2 className="text-2xl text-blue-600 font-bold mb-6">
            GGSIPU CET 2026 Counselling – Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            <p><strong className="text-blue-600">Q1. Which college can I get in GGSIPU CET 2026 with my rank?</strong><br/>
            Your college depends on multiple factors including rank, category, region (Delhi / Outside Delhi), seat availability, and counselling round.
            This predictor uses previous year cutoff trends to estimate the most realistic colleges you can get in GGSIPU CET 2026.</p>

            <p><strong className="text-blue-600">Q2. How accurate is the GGSIPU CET College Predictor 2026?</strong><br/>
            The predictor is based on official past counselling data, category-wise cutoffs, and round-wise seat movement patterns.
            While actual allotment depends on live counselling dynamics, this tool provides highly realistic predictions to guide smart decision-making.</p>

            <p><strong className="text-blue-600">Q3. Does this predictor consider category-wise cutoffs (SC, ST, OBC, EWS)?</strong><br/>
            Yes. The GGSIPU CET College Predictor 2026 considers category-specific cutoffs and seat allocation rules, including SC, ST, OBC, EWS, and General categories.</p>

            <p><strong className="text-blue-600">Q4. Is Delhi vs Outside Delhi region difference considered?</strong><br/>
            Absolutely. Region plays a critical role in GGSIPU counselling.
            This predictor factors in Delhi and Outside Delhi cutoff variations, which can significantly impact your college chances.</p>

            <p><strong className="text-blue-600">Q5. Can I predict my counselling round (Round 1, 2, 3, or Spot)?</strong><br/>
            Yes. The tool estimates your most probable counselling round based on rank proximity to previous year round-wise cutoffs and seat flow behavior.</p>

            <p><strong className="text-blue-600">Q6. Does this predictor include Spot Round chances?</strong><br/>
            Yes. If your rank falls outside regular rounds, the predictor also evaluates Spot / Special Round probability, where many seats are often filled.</p>

            <p><strong className="text-blue-600">Q7.  Are previous year cutoffs reliable for GGSIPU CET 2026 prediction?</strong><br/>
            Previous year cutoffs are the strongest indicator of counselling outcomes.
            This predictor adjusts for natural yearly variation while analyzing real historical trends rather than fixed assumptions.</p>

            <p><strong className="text-blue-600">Q8. What if my rank is near the cutoff?</strong><br/>
            Borderline ranks require strategic college ordering.
            This predictor helps identify safe, moderate, and high-risk choices, reducing the chance of losing a seat due to poor preference filling.</p>

            <p><strong className="text-blue-600">Q9. Is this predictor free to use?</strong><br/>
            Yes, the GGSIPU CET College Predictor 2026 is free to use.
            For students needing deeper counselling support, advanced strategy guidance may be available separately.</p>

            <p><strong className="text-blue-600">Q10. Can this predictor guarantee seat allotment?</strong><br/>
            No predictor can guarantee allotment. However, this tool helps you make data-backed counselling decisions, which dramatically improves your chances of securing the best possible college for your rank.</p>

          </div>

        </div>

      </div>

    </div>

  );

}