"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useRef } from "react";
import TwitterBios from "./twitter-bios";
import { useCompletion } from "ai/react";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  job: z
    .string()
    .min(3, {
      message: "job must be at least 3 characters.",
    })
    .max(160, {
      message: "job must not be longer than 160 characters.",
    }),
  vibe: z.string({
    required_error: "please select vibe.",
  }),
});

export function InfoForm() {
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { complete, completion, isLoading } = useCompletion({
    onError: (e) => {
      toast.error(e.message);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { job, vibe } = values;

    const prompt = `Begin each of the following with a triangle symbol (▲ U+25B2): Generate 3 ${
      vibe === "Casual"
        ? "relaxed"
        : vibe === "Funny"
        ? "silly"
        : "Professional"
    } twitter biographies with no hashtags. Only return these 3 twitter bios strictly starting with a triangle symbol (▲ U+25B2), nothing else. ${
      vibe === "Funny" ? "Make the biographies humerous" : ""
    }Make sure each generated biography is less than 20 characters, has short sentences that are found in Twitter bios, and feel free to use this context as well: ${job}`;

    await complete(prompt);
    scrollToBios();
  }

  const bios = completion.split("▲").filter(Boolean);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full pt-8"
        >
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="font-medium">
                    Drop in your job{" "}
                    <span className="text-slate-500">
                      (or your favourite hobby).
                    </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={"e.g. Amazon CEO"}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vibe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your vibe.</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vibe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Funny">Funny</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading && <Loader className="animate-spin h-5 w-5" />}
            {!isLoading && (
              <>
                Generate your job
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
      {bios.length > 0 && (
        <TwitterBios bioRef={bioRef} isLoading={isLoading} bios={bios} />
      )}
    </>
  );
}
