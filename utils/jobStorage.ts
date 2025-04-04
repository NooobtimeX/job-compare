import { Job } from "@/types/job";
import { isValidJob } from "./jobUtils";

const STORAGE_KEY = "saved-jobs";

export const loadJobs = (): Job[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const validJobs = parsed.filter(isValidJob);
      if (validJobs.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validJobs));
      }
      return validJobs;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return [];
};

export const saveJobs = (jobs: Job[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};

export const clearJobs = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const deleteJobById = (id: string): Job[] => {
  const current = loadJobs();
  const filtered = current.filter((j) => j.id !== id);
  saveJobs(filtered);
  return filtered;
};
