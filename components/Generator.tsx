"use client";

import { keywordOptions, toneOptions } from "@/lib/data";
import { useMutation } from "@tanstack/react-query";
import React, { FC } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import Input from "./ui/Input";
import parse from "react-html-parser";
import LoadingIcon from "./ui/LoadingIcon";
import { cn } from "@/lib/utils";

const getData = async (props: {
  title: string;
  keywords?: string;
  tone?: string;
  description: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: props.title,
        keywords: props.keywords,
        tone: props.tone,
        description: props.description,
      }),
    }
  );
  return response.body;
};

interface GeneratorProps {}

const Generator: FC<GeneratorProps> = ({}) => {
  const [generatedText, setGeneratedText] = React.useState("");

  const { mutate, isSuccess, reset, isLoading } = useMutation({
    mutationFn: getData,
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream");
      setGeneratedText("");

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setGeneratedText((prev) => prev + chunkValue);
      }
    },
  });

  const [title, setTitle] = React.useState("");
  const [keywords, setKeywords] = React.useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [tone, setTone] = React.useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [description, setDescription] = React.useState("");

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <p className="input-label">Title: </p>
          <Input
            className="min-w-[500px]"
            placeholder="Enter your title here..."
            value={title}
            onChange={(e) => setTitle((e?.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex items-center">
          <p className="input-label">Keywords: </p>
          <CreatableSelect
            className="min-w-[300px]"
            isMulti
            options={keywordOptions}
            value={keywords}
            onChange={(e) => setKeywords(e)}
            placeholder="Select or type your own..."
          />
        </div>
        <div className="flex items-center">
          <p className="input-label">Tone: </p>
          <Select
            className="min-w-[200px]"
            options={toneOptions}
            value={tone}
            onChange={(e) => setTone(e)}
          />
        </div>
        <div className="flex items-start">
          <p className="input-label">Description: </p>
          <textarea
            className="min-h-[120px] min-w-[500px] rounded-md border border-gray-300 px-4 py-2 text-slate-700"
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="ml-2 text-sm text-slate-600">{"(optional)"}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-300">
        {generatedText && (
          <div className=" generated-text mt-4 rounded-lg bg-slate-100 p-5 text-slate-700">
            {parse(generatedText || "Loading...")}
          </div>
        )}
        <div className="mx-auto mt-4 flex w-fit">
          <button
            className={cn(
              "btn flex min-w-[120px] items-center",
              isLoading && "pointer-events-none opacity-70"
            )}
            onClick={() => {
              const keywordsString = keywords
                ?.map((keyword) => keyword.value)
                ?.join(", ");

              mutate({
                title,
                keywords: keywordsString,
                tone: tone?.value,
                description,
              });
            }}
          >
            {isLoading ? (
              <span>Generating...</span>
            ) : isSuccess ? (
              <span>Generate again</span>
            ) : (
              <span>Generate</span>
            )}
            {isLoading && <LoadingIcon className="ml-2" />}
          </button>
          {isSuccess && generatedText && (
            <button
              className="btn ml-2 min-w-[120px]"
              onClick={() => {
                setTitle("");
                setKeywords(null);
                setTone(null);
                setDescription("");
                reset();
                setGeneratedText("");
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
