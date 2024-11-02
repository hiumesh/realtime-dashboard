import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function MyNuqsAdapter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
