import type { Metadata } from "next";
import CaseStudyExperience from "../../../components/case-study/CaseStudyExperience";
import { caseStudies } from "../../../lib/caseStudies";

export const metadata: Metadata = {
  title: "ApplyBW Case Study | JasonPro Solutions",
  description: "Selected JasonPro Solutions work: ApplyBW career platform experience.",
};

export default function ApplyBWCaseStudyPage() {
  return <CaseStudyExperience project={caseStudies.applybw} />;
}
