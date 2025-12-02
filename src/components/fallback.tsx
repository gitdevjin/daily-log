import { TriangleAlert } from "lucide-react";

export default function Fallback() {
  return (
    <div className="text-muted-foreground felx-col flex items-center justify-center gap-2">
      <TriangleAlert className="w-6s h-6" />
      <div>Oops! An error occurred. Please try again shortly</div>
    </div>
  );
}
