"use client";

import JobList from "@/components/JobList";
import JobModal from "@/components/JobModal";
import RandomJobButton from "@/components/RandomJobButton";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { clearJobs, loadJobs, saveJobs } from "@/utils/jobStorage";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setJobs(loadJobs());
  }, []);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  const handleSave = (job: Job) => {
    setJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      return exists
        ? prev.map((j) => (j.id === job.id ? job : j))
        : [...prev, job];
    });
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => {
            setEditingJob(null);
            setModalOpen(true);
          }}
        >
          + Add Job
        </Button>
        <RandomJobButton
          onGenerate={(job) => setJobs((prev) => [...prev, job])}
        />
      </div>

      <Button
        variant="destructive"
        onClick={() => {
          clearJobs();
          setJobs([]);
        }}
      >
        🗑️ Delete All Jobs
      </Button>

      <JobModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingJob={editingJob}
      />

      <JobList jobs={jobs} onEdit={handleEdit} onUpdate={setJobs} />
    </main>
  );
}
