import CopyButton from "./copy-button";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TwitterBios({
  isLoading,
  bios,
}: {
  isLoading: boolean;
  bios: string[];
}) {
  return bios.map((bio, index) => (
    <BioCard key={index} isLoading={isLoading} bio={bio} />
  ));
}

function BioCard({ isLoading, bio }: { isLoading: boolean; bio: string }) {
  return (
    <Card className="w-full">
      <CardContent>
        {isLoading && <Skeleton className="w-full h-6 rounded-full" />}
        {!isLoading && (
          <>
            <p>{bio}</p>
            <CopyButton bio={bio} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
