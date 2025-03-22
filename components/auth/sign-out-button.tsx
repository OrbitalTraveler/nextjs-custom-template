"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignOutButtonProps {
  variant?: "text" | "icon" | "both";
  className?: string;
  onClick?: () => void;
}

export function SignOutButton({
  variant = "text",
  className = "",
  onClick,
}: SignOutButtonProps) {
  const handleSignOut = () => {
    // Implement your sign out logic here
    // For example: signOut()

    // Call the onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  // Text-only variant
  if (variant === "text") {
    return (
      <Button
        variant="ghost"
        className={className}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    );
  }

  // Icon-only variant
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={className}
        onClick={handleSignOut}
        aria-label="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    );
  }

  // Both text and icon variant
  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
