import CopyButton from "./copy-button";
import { Card, CardContent } from "@/components/ui/card";

export default function TwitterBios({ bios }: { bios: string[] }) {
  return bios.map((bio, index) => <BioCard key={index} bio={bio} />);
}

function BioCard({ bio }: { bio: string }) {
  return (
    <Card className="w-full">
      <CardContent>
        <p>{bio}</p>
        <CopyButton bio={bio} />
      </CardContent>
    </Card>
  );
}
