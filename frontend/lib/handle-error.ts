"use client";

import { isRedirectError } from "next/dist/client/components/redirect";
import { toast } from "sonner";
import { z } from "zod";

export function getErrorMessage(err: unknown, fallback?: string) {
  const unknownError =
    fallback || "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else if (isRedirectError(err)) {
    throw err;
  } else if (typeof err === "string") {
    return err;
  } else if (
    typeof err === "object" &&
    err != null &&
    "message" in err &&
    typeof err.message === "string"
  ) {
    return err.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown, fallback?: string) {
  const errorMessage = getErrorMessage(err, fallback);
  return toast.error(errorMessage);
}
