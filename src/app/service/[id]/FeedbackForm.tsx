"use client";

import { useActionState, useState } from "react";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import FormMessage from "@/components/FormMessage";
import SubmitButton from "@/components/SubmitButton";
import { submitFeedback, type FormState } from "@/lib/actions";

export default function FeedbackForm({ id }: { id: string }) {
  const [state, action] = useActionState<FormState, FormData>(submitFeedback, {});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [liked, setLiked] = useState<"yes" | "no" | "">("");
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="rating" value={rating} />
      <input type="hidden" name="liked" value={liked} />
      <div>
        <p className="label">Did you like the service?</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setLiked("yes")}
            className={`btn ${liked === "yes" ? "bg-emerald-600 text-white" : "btn-ghost"}`}
          >
            <ThumbsUp size={18} /> Loved it
          </button>
          <button
            type="button"
            onClick={() => setLiked("no")}
            className={`btn ${liked === "no" ? "bg-red-600 text-white" : "btn-ghost"}`}
          >
            <ThumbsDown size={18} /> Not happy
          </button>
        </div>
      </div>
      <div>
        <p className="label">Rate your experience</p>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" aria-label={`${n} stars`} onMouseEnter={() => setHover(n)} onClick={() => setRating(n)}>
              <Star size={36} className="text-volt transition hover:scale-110" fill={(hover || rating) >= n ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label" htmlFor="feedback">Comments (optional)</label>
        <textarea id="feedback" name="feedback" rows={3} className="input" placeholder="Tell us what you liked or what we can improve" />
      </div>
      <FormMessage state={state} />
      <SubmitButton>Submit feedback</SubmitButton>
    </form>
  );
}
