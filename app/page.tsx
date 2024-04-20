import { Badge } from "@/components/ui/badge";
import { InfoForm } from "@/components/info-form";

export default function Home() {
  return (
    <>
      <Badge className="space-x-1 px-3 py-2 text-sm" variant="secondary">
        <b>26,299</b>
        <p>bios generated so far</p>
      </Badge>
      <h1 className="sm:text-6xl text-4xl max-w-2xl text-center font-bold">
        Generate your next Twitter bio using AI
      </h1>
      <InfoForm />
    </>
  );
}
