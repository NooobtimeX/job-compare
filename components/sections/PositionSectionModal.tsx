"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PositionInfo } from "@/types/job";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  value?: PositionInfo;
  onSave: (val: PositionInfo) => void;
};

export default function PositionSectionModal({
  open,
  onClose,
  value,
  onSave,
}: Props) {
  const [form, setForm] = useState<PositionInfo>({
    title: "",
    baseSalary: 0,
  });

  useEffect(() => {
    const initial = value
      ? structuredClone(value)
      : {
          title: "",
          baseSalary: 0,
        };
    setForm(initial);
  }, [value]);

  const handleChange = <K extends keyof PositionInfo>(
    key: K,
    val: PositionInfo[K]
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
          <DialogTitle>Position Info</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Base Salary"
            value={form.baseSalary}
            onChange={(e) =>
              handleChange("baseSalary", parseFloat(e.target.value) || 0)
            }
          />
          <Input
            type="number"
            placeholder="Bonus (optional)"
            value={form.bonus ?? ""}
            onChange={(e) =>
              handleChange(
                "bonus",
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
          />
          <Input
            placeholder="Insurance (comma separated)"
            value={form.insurance?.join(", ") || ""}
            onChange={(e) =>
              handleChange(
                "insurance",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={form.stockOptions ?? false}
                onChange={(e) => handleChange("stockOptions", e.target.checked)}
              />
              <span>Stock Options</span>
            </label>
            <Input
              type="number"
              placeholder="Vacation Days"
              value={form.vacationDays ?? ""}
              onChange={(e) =>
                handleChange(
                  "vacationDays",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>
          <Button onClick={handleSubmit} className="w-full mt-2">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
