import type { Metadata } from "next";
import CaseStudyExperience from "../../../components/case-study/CaseStudyExperience";
import { caseStudies } from "../../../lib/caseStudies";

export const metadata: Metadata = {
  title: "Kwa Masdu Furniture Case Study | JasonPro Solutions",
  description: "Selected JasonPro Solutions work: Kwa Masdu Furniture commerce experience.",
};

export default function KwaMasduCaseStudyPage() {
  return <CaseStudyExperience project={caseStudies["kwa-masdu-furniture"]} />;
}
