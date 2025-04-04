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
        <div className="space-y-2">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            placeholder="Size"
            value={form.size || ""}
            onChange={(e) => handleChange("size", e.target.value)}
          />
          <Button onClick={handleSubmit} className="w-full mt-2">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
