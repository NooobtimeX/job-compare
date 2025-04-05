"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/job";
import { deleteJobById } from "@/utils/jobStorage";

type Props = {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onUpdate: (updated: Job[]) => void;
};

export default function JobList({ jobs, onEdit, onUpdate }: Props) {
  const handleDelete = (id: string) => {
    const updated = deleteJobById(id);
    onUpdate(updated);
  };

  if (jobs.length === 0) {
    return <p className="text-gray-500">No jobs added yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">
              {job.position?.title || "Untitled Position"}
            </h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onEdit(job)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(job.id)}
              >
                🗑
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-1 text-sm text-gray-700">
            {/* Position */}
            <div>
              <strong>Base Salary:</strong>{" "}
              {job.position?.baseSalary?.toLocaleString() || "—"}
            </div>
            <div>
              <strong>Bonus:</strong>{" "}
              {job.position?.bonus?.toLocaleString() || "—"}
            </div>

            {/* Benefits */}
            <div>
              <strong>Stock Options:</strong>{" "}
              {job.benefits?.stockOptions ? "Yes" : "No"}
            </div>
            <div>
              <strong>Vacation Days:</strong>{" "}
              {job.benefits?.vacationDays ?? "—"}
            </div>
            <div>
              <strong>Insurance:</strong>{" "}
              {job.benefits?.insurance?.join(", ") || "—"}
            </div>
            <div>
              <strong>Relocation:</strong>{" "}
              {job.benefits?.relocationSupport ? "Yes" : "No"}
            </div>

            {/* Company */}
            <div>
              <strong>Company:</strong> {job.company?.name || "—"}
            </div>
            <div>
              <strong>Size:</strong> {job.company?.size || "—"}
            </div>
            <div>
              <strong>City:</strong> {job.company?.city || "—"}
            </div>

            {/* Work Condition */}
            <div>
              <strong>Work Hours:</strong> {job.workCondition?.workHours || "—"}
            </div>
            <div>
              <strong>Remote:</strong>{" "}
              {job.workCondition?.remoteOption ? "Yes" : "No"}
            </div>
            <div>
              <strong>Overtime:</strong>{" "}
              {job.workCondition?.overtime ? "Yes" : "No"}
            </div>
            <div>
              <strong>Flexible Hours:</strong>{" "}
              {job.workCondition?.flexibleHours ? "Yes" : "No"}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
