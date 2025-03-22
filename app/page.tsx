import { SignInButton } from "@/components/auth/sign-in-button";
import { SignUpButton } from "@/components/auth/sign-up-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to our app!</h1>
      <div className="space-x-4">
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
}
