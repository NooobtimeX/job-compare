import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  isSet: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export default function SectionButton({
  label,
  isSet,
  onClick,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={onClick}
        className="w-full justify-start"
      >
        {isSet ? `Edit ${label}` : `Add ${label}`}
      </Button>
      {isSet && (
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          className="w-9 h-9"
        >
          ✕
        </Button>
      )}
    </div>
  );
}
