import type { PersonalData } from "@/types/personal";
import Home from "@/pages/Home";

interface AdminPreviewProps {
  data: PersonalData;
}

export default function AdminPreview({ data }: AdminPreviewProps) {
  return (
    <div className="w-full h-full overflow-hidden">
      <Home previewData={data} />
    </div>
  );
}
