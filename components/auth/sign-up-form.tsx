"use client";

import type React from "react";
import { signIn } from "@/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import {
  FaApple,
  FaDiscord,
  FaTwitter,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { site } from "@/site";

function SignUpForm() {
  const handleCredentialsSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Here you would typically call a registration function
    // For example: registerUser(name, email, password)

    // After registration, you might want to sign in the user automatically
    // signIn(email, password)
  };

  const handleSocialSignUp = (provider: string) => {
    signIn(provider);
  };

  // Social provider icons and their respective providers
  const socialProviders = [
    {
      id: "google",
      icon: <FcGoogle className="mr-2 h-5 w-5" />,
      label: "Google",
      enabled: site.auth.google,
    },
    {
      id: "apple",
      icon: <FaApple className="mr-2 h-5 w-5" />,
      label: "Apple",
      enabled: site.auth.apple,
    },
    {
      id: "discord",
      icon: <FaDiscord className="mr-2 h-5 w-5" />,
      label: "Discord",
      enabled: site.auth.discord,
    },
    {
      id: "twitter",
      icon: <FaTwitter className="mr-2 h-5 w-5" />,
      label: "Twitter",
      enabled: site.auth.twitter,
    },
    {
      id: "facebook",
      icon: <FaFacebook className="mr-2 h-5 w-5" />,
      label: "Facebook",
      enabled: site.auth.facebook,
    },
    {
      id: "github",
      icon: <FaGithub className="mr-2 h-5 w-5" />,
      label: "GitHub",
      enabled: site.auth.github,
    },
  ];

  // Filter enabled social providers
  const enabledSocialProviders = socialProviders.filter(
    (provider) => provider.enabled
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {site.auth.credentials && (
          <form
            onSubmit={handleCredentialsSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        )}

        {site.auth.credentials &&
          enabledSocialProviders.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-sm text-muted-foreground">
                  OR
                </span>
              </div>
            </div>
          )}

        {enabledSocialProviders.length > 0 && (
          <div className="space-y-2">
            {enabledSocialProviders.map((provider) => (
              <Button
                key={provider.id}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignUp(provider.id)}
              >
                {provider.icon}
                Sign up with {provider.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/sign-in" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
