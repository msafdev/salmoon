"use client";

import { addContent } from "@/supabase/actions";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ContentForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const response = await addContent(formData);

    // Reset
    const formElement = document.getElementById(
      "content-form",
    ) as HTMLFormElement;
    if (formElement) {
      formElement.reset();
    }

    // Response handling
    if (response?.error) {
      console.error(response.error);
      toast({
        title: "Something went wrong",
        description: response.error,
        duration: 2000,
      });
    } else if (response.data) {
      toast({
        title: "Success",
        description: response.data,
        duration: 2000,
      });
    }

    setLoading(false);
  };

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={handleSubmit}
      id="content-form"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Input
          placeholder="Leave a message..."
          name="content"
          id="content"
          type="text"
          className="w-auto min-w-0 flex-1"
        />
        <Button
          disabled={loading}
          type="submit"
          size={"icon"}
          className={`anim border px-3 py-2 ${
            loading ? "bg-secondary/80" : "bg-secondary"
          }`}
          variant={"secondary"}
        >
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Button>
      </div>
    </form>
  );
};
export default ContentForm;
