"use client";

import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { loadJobs, saveJobs } from "@/utils/jobStorage";
import { generateRandomJob } from "@/utils/jobUtils";

type Props = {
  onGenerate: (job: Job) => void;
};

export default function RandomJobButton({ onGenerate }: Props) {
  const handleClick = () => {
    const job = generateRandomJob();
    const existing = loadJobs();
    saveJobs([...existing, job]);
    onGenerate(job);
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      🎲 Generate Random Job
    </Button>
  );
}
