import { PageSpinner } from "@/components/loading-spinner";

export default function AdminLoading() {
  return (
    <div className="rounded-2xl border border-[#eadfcd] bg-white">
      <PageSpinner className="min-h-[28rem]" />
    </div>
  );
}
