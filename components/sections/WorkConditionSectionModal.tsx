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
    const initial: WorkCondition = value ? structuredClone(value) : {};
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
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Work Hours</label>
            <Input
              placeholder="Work Hours"
              value={form.workHours || ""}
              onChange={(e) => handleChange("workHours", e.target.value)}
            />
          </div>

          {[
            { key: "remoteOption", label: "Remote Option" },
            { key: "overtime", label: "Overtime" },
            { key: "flexibleHours", label: "Flexible Hours" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={!!form[key as keyof WorkCondition]}
                onChange={(e) =>
                  handleChange(key as keyof WorkCondition, e.target.checked)
                }
              />
              <label>{label}</label>
            </div>
          ))}

          <Button onClick={handleSubmit} className="w-full mt-2">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
