import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button variant="outline" className={className} asChild>
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
}
