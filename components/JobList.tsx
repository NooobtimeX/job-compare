"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Job } from "@/types/job";
import { deleteJobById } from "@/utils/jobStorage";

type Props = {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onUpdate: (updated: Job[]) => void;
};

export default function JobList({ jobs, onEdit, onUpdate }: Props) {
  if (jobs.length === 0) {
    return <p className="text-gray-500">No jobs added yet.</p>;
  }

  const handleDelete = (id: string) => {
    const updated = deleteJobById(id);
    onUpdate(updated);
  };

  const headers = [
    "Title",
    "Base Salary",
    "Bonus",
    "Stock Options",
    "Vacation Days",
    "Insurance",
    "Company",
    "Size",
    "City",
    "Relocation",
    "Work Hours",
    "Remote",
    "Overtime",
    "Flexible Hours",
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-white border rounded-xl shadow p-6 min-w-[1200px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Job Comparison
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((label) => (
                <TableHead key={label}>{label}</TableHead>
              ))}
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                  {job.position?.title || "—"}
                </TableCell>
                <TableCell>
                  {job.position?.baseSalary?.toLocaleString() || "—"}
                </TableCell>
                <TableCell>
                  {job.position?.bonus?.toLocaleString() || "—"}
                </TableCell>
                <TableCell>
                  {job.position?.stockOptions ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {job.position?.vacationDays !== undefined
                    ? `${job.position.vacationDays} days`
                    : "—"}
                </TableCell>
                <TableCell>
                  {job.position?.insurance?.join(", ") || "—"}
                </TableCell>
                <TableCell>{job.company?.name || "—"}</TableCell>
                <TableCell>{job.company?.size || "—"}</TableCell>
                <TableCell>{job.company?.city || "—"}</TableCell>
                <TableCell>
                  {job.company?.relocationSupport === undefined
                    ? "—"
                    : job.company.relocationSupport
                      ? "Yes"
                      : "No"}
                </TableCell>
                <TableCell>{job.workCondition?.workHours || "—"}</TableCell>
                <TableCell>
                  {job.workCondition?.remoteOption === undefined
                    ? "—"
                    : job.workCondition.remoteOption
                      ? "Yes"
                      : "No"}
                </TableCell>
                <TableCell>
                  {job.workCondition?.overtime === undefined
                    ? "—"
                    : job.workCondition.overtime
                      ? "Yes"
                      : "No"}
                </TableCell>
                <TableCell>
                  {job.workCondition?.flexibleHours === undefined
                    ? "—"
                    : job.workCondition.flexibleHours
                      ? "Yes"
                      : "No"}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
