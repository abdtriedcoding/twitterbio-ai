import CopyButton from "./copy-button";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TwitterBios({
  bioRef,
  isLoading,
  bios,
}: {
  bioRef: any;
  isLoading: boolean;
  bios: string[];
}) {
  return bios.map((bio, index) => (
    <BioCard bioRef={bioRef} key={index} isLoading={isLoading} bio={bio} />
  ));
}

function BioCard({
  bioRef,
  isLoading,
  bio,
}: {
  bioRef: any;
  isLoading: boolean;
  bio: string;
}) {
  return (
    <Card ref={bioRef} className="w-full">
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
