"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CompanyInfo } from "@/types/job";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  value?: CompanyInfo;
  onSave: (val: CompanyInfo) => void;
};

const companySizeOptions = [
  "1-10",
  "11-100",
  "101-1000",
  "1001-10000",
  "10000+",
];

export default function CompanySectionModal({
  open,
  onClose,
  value,
  onSave,
}: Props) {
  const [form, setForm] = useState<CompanyInfo>({ name: "" });

  useEffect(() => {
    const initial = value ? structuredClone(value) : { name: "" };
    setForm(initial);
  }, [value]);

  const handleChange = (key: keyof CompanyInfo, val: string) => {
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
          <DialogTitle>Company Info</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Company Size</label>
            <select
              value={form.size || ""}
              onChange={(e) => handleChange("size", e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm text-gray-900"
            >
              <option value="">Select Company Size</option>
              {companySizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">City</label>
            <Input
              placeholder="City"
              value={form.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
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
