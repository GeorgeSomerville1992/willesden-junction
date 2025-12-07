import { useState } from "react";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type NotStartedProps = {
  handleSetGame: (name: string) => void;
  handleDisableAnalytics?: (disabled: boolean) => void;
};

export const NotStarted = ({
  handleSetGame,
  handleDisableAnalytics,
}: NotStartedProps) => {
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSetGame(name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center form">
      <FieldSet>
        <FieldGroup>
          <FieldLabel htmlFor="feedback">Please enter your name</FieldLabel>
          <Textarea
            id="name"
            rows={4}
            value={name}
            name="name"
            autoComplete="given-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name here"
            minLength={5}
            required
          />
        </FieldGroup>
      </FieldSet>
      <div className="flex items-center space-x-2 mt-2">
        <Switch
          id="disable-analytics"
          onCheckedChange={handleDisableAnalytics}
        />
        <Label htmlFor="disable-analytics">Disable Analytics</Label>
      </div>
      <Button
        variant="outline"
        type="submit"
        className="mt-5 block w-50 self-center btn-primary"
      >
        Start
      </Button>
    </form>
  );
};
