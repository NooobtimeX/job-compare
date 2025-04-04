import { Job } from "@/types/job";
import { useEffect, useState } from "react";

export function useJobForm(editingJob?: Job | null) {
  const [job, setJob] = useState<Job>({ id: crypto.randomUUID() });

  useEffect(() => {
    setJob(editingJob || { id: crypto.randomUUID() });
  }, [editingJob]);

  const updateField = <K extends keyof Job>(key: K, value: Job[K]) => {
    setJob((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = (key: keyof Job) => {
    setJob((prev) => {
      const clone = { ...prev };
      delete clone[key];
      return clone;
    });
  };

  return { job, setJob, updateField, handleDelete };
}
