"use client";

import { useState } from "react";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";

import { updateProfile } from "@/actions/profile/update-profile";

type ProfileFormProps = {
  user: {
    headline?: string;
    bio?: string;
    location?: string;
    skillsOffered?: string[];
    skillsWanted?: string[];
  };
};

export default function ProfileForm({
  user,
}: ProfileFormProps) {
  const [headline, setHeadline] = useState(
    user.headline ?? ""
  );

  const [bio, setBio] = useState(
    user.bio ?? ""
  );

  const [location, setLocation] = useState(
    user.location ?? ""
  );

  const [skillsOffered, setSkillsOffered] = useState(
    user.skillsOffered?.join(", ") ?? ""
  );

  const [skillsWanted, setSkillsWanted] = useState(
    user.skillsWanted?.join(", ") ?? ""
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    console.log("FORM VALUES", {
      headline,
      bio,
      location,
      skillsOffered,
      skillsWanted,
    });

    setLoading(true);
    setMessage("");

    const result = await updateProfile({
      headline,
      bio,
      location,

      skillsOffered: skillsOffered
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      skillsWanted: skillsWanted
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });

    setLoading(false);

    if (!result.success) {
      setMessage(result.message || "Failed to update profile");
      return;
    }

    setMessage("Profile updated successfully");
  }

  return (
    <Card className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          placeholder="Headline"
          value={headline}
          onChange={(e) =>
            setHeadline(e.target.value)
          }
        />

        <Textarea
          placeholder="Tell others about yourself..."
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
        />

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <Input
          placeholder="Skills Offered (comma separated)"
          value={skillsOffered}
          onChange={(e) =>
            setSkillsOffered(e.target.value)
          }
        />

        <Input
          placeholder="Skills Wanted (comma separated)"
          value={skillsWanted}
          onChange={(e) =>
            setSkillsWanted(e.target.value)
          }
        />

        {message && (
          <p className="text-sm text-green-500">
            {message}
          </p>
        )}

        <Button
          type="submit"
          isLoading={loading}
        >
          Save Profile
        </Button>
      </form>
    </Card>
  );
}