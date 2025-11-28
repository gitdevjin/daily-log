import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPwdResetEmail } from "@/hooks/mutations/use-request-pwd-reset-email";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPwdResetEmail({
    onSuccess: () => {
      toast.info("Reset Email has been sent Successfully", {
        position: "top-center",
      });
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
      });
      setEmail("");
    },
  });

  const handleSendEmail = () => {
    if (email.trim() === "") return;
    requestPasswordResetEmail(email);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">Forgot password?</div>
        <div className="text-muted-foreground">
          Enter your email and we will send you a link to reset your password
        </div>
      </div>
      <Input
        disabled={isRequestPasswordResetEmailPending}
        onChange={(e) => setEmail(e.target.value)}
        className="py-6"
        type={"email"}
        placeholder="example@abc.com"
      />
      <Button
        disabled={isRequestPasswordResetEmailPending}
        onClick={handleSendEmail}
        className="w-full"
      >
        Send Email
      </Button>
    </div>
  );
}
