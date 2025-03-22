import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SignUpButtonProps {
  className?: string;
}

export function SignUpButton({ className }: SignUpButtonProps) {
  return (
    <Button variant="default" className={className} asChild>
      <Link href="/sign-up">Get Started</Link>
    </Button>
  );
}
