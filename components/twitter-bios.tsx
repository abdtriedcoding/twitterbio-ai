import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import CopyButton from "./copy-button";

export default function TwitterBios({ bios }: { bios: string[] }) {
  return (
    <Card className="w-full">
      <CardContent>
        <p>Card Content</p>
        <CopyButton />
      </CardContent>
    </Card>
  );
}
