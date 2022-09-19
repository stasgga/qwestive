import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="px-2 py-2">
        <button
          className="bg-violet-500 px-2 py-2 rounded-sm text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="px-2 py-2">
      <button
        className="bg-violet-500 px-2 py-2 rounded-xl text-white"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
