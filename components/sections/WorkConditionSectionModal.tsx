"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { WorkCondition } from "@/types/job";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  value?: WorkCondition;
  onSave: (val: WorkCondition) => void;
};

export default function WorkConditionSectionModal({
  open,
  onClose,
  value,
  onSave,
}: Props) {
  const [form, setForm] = useState<WorkCondition>({});

  useEffect(() => {
    const initial = value ? structuredClone(value) : {};
    setForm(initial);
  }, [value]);

  const handleChange = <K extends keyof WorkCondition>(
    key: K,
    val: WorkCondition[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Work Condition</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Work Hours"
            value={form.workHours || ""}
            onChange={(e) => handleChange("workHours", e.target.value)}
          />
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.remoteOption || false}
              onChange={(e) => handleChange("remoteOption", e.target.checked)}
            />
            <span>Remote Option</span>
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.overtime || false}
              onChange={(e) => handleChange("overtime", e.target.checked)}
            />
            <span>Overtime</span>
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.flexibleHours || false}
              onChange={(e) => handleChange("flexibleHours", e.target.checked)}
            />
            <span>Flexible Hours</span>
          </label>
          <Button onClick={handleSubmit} className="w-full mt-2">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
