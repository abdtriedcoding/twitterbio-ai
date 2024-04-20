import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-center w-full border-t flex sm:flex-row flex-col justify-between items-center p-4 space-y-3">
      <div>
        Powered by{" "}
        <a
          href="https://sdk.vercel.ai"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel AI SDK{" "}
        </a>
        and{" "}
        <a
          href="https://claude.ai"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Claude
        </a>
      </div>
      <div className="flex items-center space-x-4 pb-4 sm:pb-0">
        <Link target="_blank" href="https://twitter.com/abdtriedcoding">
          <Twitter className="w-5 h-5" />
        </Link>
        <Link target="_blank" href="https://github.com/abdtriedcoding">
          <Github className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}
