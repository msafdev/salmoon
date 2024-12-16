import { githubSignIn, googleSignIn, signOut } from "@/supabase/functions";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import Button from "@/components/shared/button";
import ContentForm from "@/components/form/content-form";

const GuestbookForm = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col">
      {user ? (
        <div className="flex w-full flex-col gap-y-1">
          <ContentForm />
          <form action={signOut}>
            <button 
              type="submit" 
              className="text-xs text-muted-foreground hover:text-foreground md:text-sm"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {[
            { 
              provider: 'github', 
              action: githubSignIn, 
              label: 'Sign in with GitHub' 
            },
            { 
              provider: 'google', 
              action: googleSignIn, 
              label: 'Sign in with Google' 
            }
          ].map(({ provider, action, label }) => (
            <form key={provider} action={action} className="flex flex-1">
              <Button type="submit" className="flex w-full items-center gap-x-2">
                <Image
                  src={`/icons/${provider}.png`}
                  alt={`${provider} Logo`}
                  width={16}
                  height={16}
                />
                {label}
              </Button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestbookForm;