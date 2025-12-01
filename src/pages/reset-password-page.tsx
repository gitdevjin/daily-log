import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/auth/use-update-password";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("Passwored has been updated Successfully", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
        setPassword("");
      },
    });

  const handleUpdatePassword = () => {
    if (password.trim() === "") return;
    updatePassword(password);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">Reset Password</div>
        <div className="text-muted-foreground">Enter your new password</div>
      </div>
      <Input
        disabled={isUpdatePasswordPending}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="py-6"
        placeholder="new password"
      />
      <Button
        disabled={isUpdatePasswordPending}
        onClick={handleUpdatePassword}
        className="w-full"
      >
        Reset Password
      </Button>
    </div>
  );
}
