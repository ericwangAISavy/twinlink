"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminSearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      className="relative hidden min-w-0 max-w-md flex-1 md:block"
      onSubmit={(event) => {
        event.preventDefault();
        const query = value.trim();
        if (!query) return;
        router.push(`/admin/search?q=${encodeURIComponent(query)}`);
      }}
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search candidates, jobs, or anything..."
        aria-label="Admin search"
        className="h-10 rounded-full border-[#eadfcd] bg-white pl-9"
      />
    </form>
  );
}
