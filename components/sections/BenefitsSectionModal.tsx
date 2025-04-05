"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Benefits } from "@/types/job";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  value?: Benefits;
  onSave: (val: Benefits) => void;
};

export default function BenefitsSectionModal({
  open,
  onClose,
  value,
  onSave,
}: Props) {
  const [form, setForm] = useState<Benefits>({});

  useEffect(() => {
    const initial = value ? structuredClone(value) : {};
    setForm(initial);
  }, [value]);

  const handleChange = <K extends keyof Benefits>(key: K, val: Benefits[K]) => {
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
          <DialogTitle>Benefits</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Relocation Support</label>
            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={form.relocationSupport || false}
                onChange={(e) =>
                  handleChange("relocationSupport", e.target.checked)
                }
              />
              <span>Enable relocation support</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              Insurance (comma separated)
            </label>
            <Input
              placeholder="e.g. Basic, Premium"
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
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Stock Options</label>
            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={form.stockOptions || false}
                onChange={(e) => handleChange("stockOptions", e.target.checked)}
              />
              <span>Include stock options</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Vacation Days</label>
            <Input
              type="number"
              placeholder="e.g. 12"
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
