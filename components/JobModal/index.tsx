"use client";

import BenefitsSectionModal from "@/components/sections/BenefitsSectionModal";
import CompanySectionModal from "@/components/sections/CompanySectionModal";
import PositionSectionModal from "@/components/sections/PositionSectionModal";
import WorkConditionSectionModal from "@/components/sections/WorkConditionSectionModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Job } from "@/types/job";
import { useState } from "react";
import SectionButton from "./SectionButton";
import { useJobForm } from "./useJobForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
  editingJob?: Job | null;
};

type ModalState = {
  company: boolean;
  position: boolean;
  benefits: boolean;
  workCondition: boolean;
};

export default function JobModal({ open, onClose, onSave, editingJob }: Props) {
  const { job, updateField, handleDelete } = useJobForm(editingJob);

  const [modals, setModals] = useState<ModalState>({
    company: false,
    position: false,
    benefits: false,
    workCondition: false,
  });

  const openModal = (key: keyof ModalState) =>
    setModals((prev) => ({ ...prev, [key]: true }));
  const closeModal = (key: keyof ModalState) =>
    setModals((prev) => ({ ...prev, [key]: false }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job Sections</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <SectionButton
            label="Company Info"
            isSet={!!job.company}
            onClick={() => openModal("company")}
            onDelete={() => handleDelete("company")}
          />
          <SectionButton
            label="Position Info"
            isSet={!!job.position}
            onClick={() => openModal("position")}
            onDelete={() => handleDelete("position")}
          />
          <SectionButton
            label="Work Condition"
            isSet={!!job.workCondition}
            onClick={() => openModal("workCondition")}
            onDelete={() => handleDelete("workCondition")}
          />
          <SectionButton
            label="Benefits"
            isSet={!!job.benefits}
            onClick={() => openModal("benefits")}
            onDelete={() => handleDelete("benefits")}
          />
        </div>

        <Button
          onClick={() => {
            onSave(job);
            onClose();
          }}
          className="w-full mt-4"
        >
          Save Job
        </Button>
      </DialogContent>

      {/* Section Modals */}
      <CompanySectionModal
        open={modals.company}
        onClose={() => closeModal("company")}
        value={job.company}
        onSave={(val) => updateField("company", val)}
      />
      <PositionSectionModal
        open={modals.position}
        onClose={() => closeModal("position")}
        value={job.position}
        onSave={(val) => updateField("position", val)}
      />
      <WorkConditionSectionModal
        open={modals.workCondition}
        onClose={() => closeModal("workCondition")}
        value={job.workCondition}
        onSave={(val) => updateField("workCondition", val)}
      />
      <BenefitsSectionModal
        open={modals.benefits}
        onClose={() => closeModal("benefits")}
        value={job.benefits}
        onSave={(val) => updateField("benefits", val)}
      />
    </Dialog>
  );
}
