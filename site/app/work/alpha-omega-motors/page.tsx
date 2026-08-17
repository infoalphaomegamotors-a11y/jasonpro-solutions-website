import type { Metadata } from "next";
import CaseStudyExperience from "../../../components/case-study/CaseStudyExperience";
import { caseStudies } from "../../../lib/caseStudies";

export const metadata: Metadata = {
  title: "Alpha Omega Motors Case Study | JasonPro Solutions",
  description: "Selected JasonPro Solutions work: Alpha Omega Motors automotive sales experience.",
};

export default function AlphaOmegaCaseStudyPage() {
  return <CaseStudyExperience project={caseStudies["alpha-omega-motors"]} />;
}
