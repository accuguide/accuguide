import UnsubscribeForm from "@/components/forms/unsubscribe";
import { Toaster } from "@/components/ui/sonner";

export default function Page() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <UnsubscribeForm />
    </>
  );
}
