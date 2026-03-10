import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BASE_URL } from "../url/BaseUrl";

export default function LLBPage() {

  const [rank, setRank] = useState("");
  const [course, setCourse] = useState("B.A.-L.L.B.");
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

  pdf.save("llb-college-prediction.pdf");
};

  useEffect(() => {
  const paid = localStorage.getItem("paid_llb");

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

      const res = await fetch(`http://localhost:5000/api/llb`, {
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
          GGSIPU LLB Counselling College Predictor 2026 – Rank, Category & Round Wise
        </h1>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          An advanced counselling-based LLB College predictor for GGSIPU aspirants.
          Analyze your admission chances using real cutoff data, college ranking,
          shift preference, probability insights, and seat security — built to guide real counselling decisions.
        </p>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Choosing the right college during GGSIPU LLB Counselling 2026 is not just about your rank — it is about
          understanding counselling rounds, category cutoffs, region-based seat allocation, and real seat movement patterns.
        </p>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Every year, thousands of law aspirants lose better LLB colleges not because of poor rank, but due to incorrect
          preference filling, misunderstanding Delhi vs Outside Delhi cutoffs, or misjudging counselling rounds.
        </p>

        {/* HEADER */}
        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            🎓 GGSIPU Law College Predictor
          </h2>

          <p className="text-black-300 mt-2">
            Free tool to discover law colleges suitable for your rank & profile
          </p>

        </div>

        {/* FORM CARD */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <label className="text-sm text-black-300">Your CLAT Rank</label>
              <input
                type="number"
                placeholder="Enter your rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-black-300">Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-teal-400"
              >
                <option className="text-black" value="B.A.-L.L.B.">BA LL.B</option>
                <option className="text-black" value="B.B.A.-L.L.B.">BBA LL.B</option>
              </select>
            </div>

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

          <button
            onClick={predictColleges}
            className="w-full mt-8 py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition transform rounded-xl font-semibold shadow-lg"
          >
            <Search size={18} />
            Predict Colleges
          </button>

          {error && (
            <p className="text-red-400 text-center mt-5 font-semibold">
              {error}
            </p>
          )}

        </div>

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
              onClick={() => window.location.href="/unlock?course=llb"}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Unlock Full Report
            </button>

          </div>

        )}

        {isPaid && (

          <button
            onClick={downloadPDF}
            className="mt-6 px-6 py-3 bg-teal-500 rounded-xl"
          >
            Download PDF Report
          </button>

        )}

        {/* INFORMATION SECTION */}

        <div className="mt-16 text-black-300 space-y-4">

          <p>
            The <strong>GGSIPU LLB Counselling College Predictor 2026</strong> is designed to solve this exact problem.
          </p>

          <p>
            This advanced predictor analyzes previous year GGSIPU LLB cutoffs,
            category-wise seat distribution, and round-wise counselling behavior to help you predict:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Which LLB colleges you can realistically get</li>
            <li>In which counselling round (Round 1, 2, 3 or Spot)</li>
            <li>Based on your rank, category, and region</li>
          </ul>

          <p>
            Unlike generic college lists, this tool focuses on decision accuracy, not guesswork.
            It helps you shortlist colleges strategically so you can maximize your final seat allotment.
          </p>

        </div>

        {/* FAQ SECTION */}

        <div className="mt-16">

          <h2 className="text-2xl text-blue-600 font-bold mb-6">
            GGSIPU LLB Counselling 2026 – Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            <p><strong className="text-blue-600">Q1. Which college can I get in GGSIPU LLB 2026 with my rank?</strong><br/>
            Your college depends on rank, category, region, seat availability, and counselling round.
            This predictor analyzes previous year trends to estimate the most realistic LLB colleges you can get.</p>

            <p><strong className="text-blue-600">Q2. How accurate is the GGSIPU LLB College Predictor 2026?</strong><br/>
            The predictor is based on official past counselling data and real seat movement patterns.
            While no predictor can guarantee allotment, this tool provides highly reliable guidance for counselling decisions.</p>

            <p><strong className="text-blue-600">Q3. Does this predictor consider category-wise cutoffs?</strong><br/>
            Yes. It considers General, SC, ST, OBC, and EWS category cutoffs separately, following GGSIPU reservation rules.</p>

            <p><strong className="text-blue-600">Q4. Is Delhi vs Outside Delhi region difference included?</strong><br/>
            Yes. Region-based cutoffs significantly affect LLB admissions.
            The predictor separately evaluates Delhi and Outside Delhi candidates to avoid incorrect predictions.</p>

            <p><strong className="text-blue-600">Q5. Can I predict my counselling round?</strong><br/>
            Yes. The tool estimates whether you are more likely to get a seat in Round 1, Round 2, Round 3, or Spot Round, based on rank proximity to past cutoffs.</p>

            <p><strong className="text-blue-600">Q6. Does this predictor show Spot Round chances?</strong><br/>
            Yes. If your rank falls outside regular rounds, the system evaluates Spot / Special Round probability where many LLB seats are filled.</p>

            <p><strong className="text-blue-600">Q7. Are previous year cutoffs reliable for LLB prediction?</strong><br/>
            Yes. Previous year cutoffs are the strongest indicator of counselling outcomes when combined with round-wise analysis.</p>

            <p><strong className="text-blue-600">Q8. What if my rank is near the cutoff?</strong><br/>
            Borderline ranks require smart preference ordering.
            This predictor helps identify safe, moderate, and high-risk college choices.</p>

            <p><strong className="text-blue-600">Q9. Is this GGSIPU LLB Predictor free?</strong><br/>
            Yes, the basic predictor is free to use.
            Advanced counselling reports, full college lists, and comparison tools may be part of paid services.</p>

            <p><strong className="text-blue-600">Q10. Can this predictor guarantee a seat?</strong><br/>
            No predictor can guarantee allotment.
            However, this tool helps you make data-backed counselling decisions, significantly improving your chances.</p>

          </div>

        </div>

      </div>

    </div>

  );
}