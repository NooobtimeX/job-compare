import { Job } from "@/types/job";

// Type guard for Job
export const isValidJob = (job: any): job is Job => {
  return (
    typeof job === "object" &&
    typeof job.id === "string" &&
    (job.company === undefined || typeof job.company.name === "string") &&
    (job.position === undefined || typeof job.position.title === "string") &&
    (job.position === undefined || typeof job.position.baseSalary === "number")
  );
};

const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randBool = () => Math.random() < 0.5;

export const generateRandomJob = (): Job => ({
  id: crypto.randomUUID(),
  company: randBool()
    ? {
        name: random(["Blitzwerk", "NextVision", "CodeMint", "PixelEdge"]),
        size: random(["Small", "Medium", "Large"]),
        city: random(["Bangkok", "Chiang Mai", "Remote"]),
        relocationSupport: randBool(),
      }
    : undefined,
  position: randBool()
    ? {
        title: random(["Frontend Dev", "Fullstack Dev", "Backend Dev"]),
        baseSalary: Math.floor(Math.random() * 50000) + 25000,
        bonus: randBool() ? Math.floor(Math.random() * 10000) : undefined,
        stockOptions: randBool(),
        vacationDays: randBool()
          ? 10 + Math.floor(Math.random() * 11)
          : undefined,
        insurance: randBool() ? ["Basic", "Premium"] : undefined,
      }
    : undefined,
  workCondition: randBool()
    ? {
        workHours: "9-6",
        remoteOption: randBool(),
        overtime: randBool(),
        flexibleHours: randBool(),
      }
    : undefined,
});
