export const PROFILE = {
  name: "Awelechukwu Benjamin Ofili",
  shortName: "Benjamin Ofili",
  jobTitle: "Software Engineer",
  headline: "Software Engineer · Full-Stack & Mobile Developer",
  study: "BSc (Hons) Business Computing and Data Analytics — Final Year",
  statement:
    "I build software and data-driven systems across web, mobile, backend and applied AI.",
  location: "Flic en Flac, Mauritius",
  availability:
    "Open to internships, student-compatible opportunities and early-career technology roles",
  email: "benjaminofili34@gmail.com",
  phone: "+230 5459 0308",
  phoneHref: "tel:+23054590308",
  linkedin: "https://www.linkedin.com/in/awelechukwu-ofili-3b9450367",
  github: "https://github.com/Benjaminofili",
  cvPath: "/Awelechukwu_Benjamin_Ofili_Software_Engineer_CV.pdf",
} as const;

export const SITE_DESCRIPTION =
  "Software Engineer and final-year Business Computing and Data Analytics student in Mauritius. Full-stack, mobile and backend development with growing business intelligence and data analytics capability.";

export const IDENTITY_BLOCKS = [
  `Identity: ${PROFILE.name} is a software engineer (full-stack and mobile developer) based in ${PROFILE.location}. He is a final-year BSc (Hons) Business Computing and Data Analytics student at Middlesex University Mauritius (2026-2027).`,
  "Education: Advanced Diploma in Software Engineering from Aptech Computer Education, completed 12 February 2026 with Distinction. BSc (Hons) Business Computing and Data Analytics at Middlesex University Mauritius, Year 3 (final year), 2026-2027.",
  "Experience: Software Engineering Intern at Imansoft Technologies, Lagos, Nigeria, August-September 2025. Agile team, web and mobile application work, frontend debugging and state management in existing codebases.",
  `Availability and contact: ${PROFILE.availability}. Email ${PROFILE.email}. LinkedIn ${PROFILE.linkedin}. GitHub ${PROFILE.github}.`,
  "Direction: software engineering foundation with growing business intelligence, data analytics and systems analysis capability. Long-term specialisation is not fixed. Open to hybrid technical and business roles.",
] as const;
