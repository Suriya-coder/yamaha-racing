"use client";

import { useActionState } from "react";
import { Search } from "lucide-react";
import FormMessage from "./FormMessage";
import SubmitButton from "./SubmitButton";
import { lookup, type FormState } from "@/lib/actions";

export default function LookupForm({ placeholder = "YR-XXXXXX, SV-XXXXXX or 10-digit mobile" }: { placeholder?: string }) {
  const [state, action] = useActionState<FormState, FormData>(lookup, {});
  return (
    <form action={action} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input name="q" className="input pl-10 text-lg" placeholder={placeholder} autoFocus />
        </div>
        <SubmitButton>Track</SubmitButton>
      </div>
      <FormMessage state={state} />
    </form>
  );
}
