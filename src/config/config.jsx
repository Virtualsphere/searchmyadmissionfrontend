const config = {
  llb: {
    exam: "GGSIPU LLB Counselling",
    endpoint: "/llb",
    courses: ["B.A.-L.L.B.", "B.B.A.-L.L.B."],
    showRegion: true,
    categories: ["general", "obc", "sc", "st", "ews"]
  },
  bca: {
    exam: "GGSIPU CET Counselling",
    endpoint: "/bca",
    courses: ["Bachelor of Computer Applications"],
    showRegion: true,
    categories: ["general", "obc", "sc", "st", "ews"]
  },
  bba: {
    exam: "GGSIPU CET Counselling",
    endpoint: "/bba",
    courses: ["Bachelor of Business Administration"],
    showRegion: true,
    categories: ["general", "obc", "sc", "st", "ews"]
  },
  btech: {
    exam: "AKTU BTech Counselling",
    endpoint: "/btech",
    showRegion: true,
    categories: ["OPEN", "OPEN(GIRL)", "ST", "ST(GIRL)", "OPEN(TF)", "EWS(OPEN)", "BC", "EWS(GL)", "BC(Girl)", "SC(Girl)", "SC", "EWS"],
    courses: [
        { label: "CSE", value: "Computer Science and Engineering" },
        { label: "CSE-AI", value: "Computer Science and Engineering (Artificial Intelligence)" },
        { label: "CE", value: "Civil Engineering" },
        { label: "CHE", value: "Chemical Engineering" },
        { label: "ME", value: "Mechanical Engineering" },
        { label: "ECE", value: "Electronics and Communication Engineering" },
        { label: "CSE-AIML", value: "Computer Science And Engineering(Artificial Intelligence & Machine Learning)" },
        { label: "ME", value: "Mechanical Engineering" },
        { label: "CE-FW", value: "Civil Engineering (FW)" },
        { label: "EEE", value: "Electrical & Electronics Engineering" },
        { label: "CTT", value: "Carpet & Textile Technology" },
        { label: "CSE-DS", value: "Computer Science And Engineering(Data Science)" },
        { label: "EE", value: "Electronics Engineering" },
        { label: "CS-H", value: "Computer Science (Hindi)" },
        { label: "IT", value: "Information Technology" },
        { label: "CSE-FW", value: "Computer Science and Engineering (FW)" },
        { label: "ECE-VLSI", value: "Electronics Engineering (VLSI Design and Technology)" },
        { label: "CSE-AIML-FW", value: "Computer Science And Engineering(Artificial Intelligence & Machine Learning) (FW)" },
        { label: "AI-DS", value: "Artificial Inelligence (AI) And Data Science" },
        { label: "CSE-CS", value: "Computer Science & Engineering (Cyber Security)" },
        { label: "AMAI", value: "Advanced Mechatronics and Industrial Automation" },
        { label: "ECE", value: "Electrical and Computer Engineering" },
        { label: "CS", value: "Computer Science" },
        { label: "EE", value: "Electrical Engineering" },
        { label: "CS-IT", value: "Computer Science Information Technology" },
        { label: "ECE-FW", value: "Electronics and Communication Engineering (FW)" },
        { label: "AR", value: "Automotion & Robotics" },
        { label: "MIT-CSE", value: "Master Of Integrated Technology (Computer Science and Engineering)" },
        { label: "CSE-AI-FW", value: "Computer Science and Engineering (Artificial Intelligence) (FW)" },
        { label: "ICE", value: "Instrumentation and Control Engineering" },
        { label: "EE-FW", value: "Electronics Engineering (FW)" },
        { label: "AI-ML", value: "Artificial Intelligence And Machine Learning" },
        { label: "CSE-DS-FW", value: "Computer Science And Engineering(Data Science) (FW)" },
        { label: "ICE", value: "Instrumentation and Control Engineering" },
    ]
  }
};

export default config;