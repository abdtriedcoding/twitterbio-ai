import { toast } from "sonner";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ bio }: { bio: string }) {
  const [copy, setCopy] = useState(false);
  const iconClassName = "w-4 h-4 cursor-pointer ml-auto";

  const handleCopy = () => {
    setCopy(true);
    navigator.clipboard.writeText(bio);
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <>
      {copy ? (
        <Check className={`${iconClassName} text-green-400`} />
      ) : (
        <Copy onClick={handleCopy} className={iconClassName} />
      )}
    </>
  );
}
