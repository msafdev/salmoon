import { githubSignIn, googleSignIn, signOut } from "@/supabase/functions";

import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";

import ContentForm from "./content-form";

const GuestbookForm = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col">
      {user ? (
        <div className="flex w-full flex-col gap-y-1">
          <ContentForm />
          <form action={signOut} className="">
            <button type="submit" className="text-xs md:text-sm">
              <p className="anim text-muted-foreground hover:text-foreground">
                Sign out
              </p>
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <form action={githubSignIn} className="flex flex-1">
            <Button
              type="submit"
              className="flex w-full items-center gap-x-2"
              variant={"secondary"}
            >
              <BsGithub size={16} /> Sign in with GitHub
            </Button>
          </form>
          <form action={googleSignIn} className="flex flex-1">
            <Button
              type="submit"
              className="flex w-full items-center gap-x-2"
              variant={"secondary"}
            >
              <FcGoogle size={14} /> Sign in with Google
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GuestbookForm;
