"use client";

import { useActionState } from "react";
import FormMessage from "@/components/FormMessage";
import SubmitButton from "@/components/SubmitButton";
import { adminLogin, type FormState } from "@/lib/actions";

export default function LoginForm() {
  const [state, action] = useActionState<FormState, FormData>(adminLogin, {});
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label" htmlFor="password">Admin password</label>
        <input id="password" name="password" type="password" className="input" autoFocus />
      </div>
      <FormMessage state={state} />
      <SubmitButton className="w-full">Sign in</SubmitButton>
    </form>
  );
}
