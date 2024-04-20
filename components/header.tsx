import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, SquarePen } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full border-b-2 p-4">
      <Link href="/" className="flex space-x-3 items-center">
        <SquarePen className="w-7 h-7" />
        <h1 className="sm:text-3xl text-2xl font-bold ml-2 tracking-tight">
          twitterbio
        </h1>
      </Link>

      <Button asChild>
        <Link
          target="_blank"
          href={"https://github.com/abdtriedcoding/twitterbio-ai"}
        >
          <Github className="w-5 h-5" />
          <p>Star on GitHub</p>
        </Link>
      </Button>
    </header>
  );
}
