import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function TwitterBios({ bios }: { bios: string[] }) {
  return (
    <Card className="w-full">
      <CardContent>
        <p>Card Content</p>
        <Copy className="w-5 h-5 ml-auto" />
      </CardContent>
    </Card>
  );
}
