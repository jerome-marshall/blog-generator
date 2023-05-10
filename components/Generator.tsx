import { keywordOptions, toneOptions } from "@/lib/data";
import { useMutation } from "@tanstack/react-query";
import React, { FC } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Input from "./ui/Input";
import parse from "react-html-parser";

const getData = async (props) => {
  console.log("🚀 ~ file: Generator.tsx:8 ~ getData ~ props:", props);
  const response = await fetch("http://localhost:3000/api/generate", {
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
  });
  const data = await response.json();
  return data;
};

interface GeneratorProps {}

const Generator: FC<GeneratorProps> = ({}) => {
  const { mutate, data, isSuccess, reset } = useMutation({
    mutationFn: getData,
  });

  const [title, setTitle] = React.useState("");
  console.log("🚀 ~ file: Generator.tsx:35 ~ title:", title);
  const [keywords, setKeywords] = React.useState(null);
  const [tone, setTone] = React.useState(null);
  const [description, setDescription] = React.useState("");

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <p className="input-label">Title: </p>
          <Input
            className="min-w-[500px]"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            placeholder="Enter your description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="ml-2 text-sm text-slate-600">{"(optional)"}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-300">
        {isSuccess && (
          <div className=" generated-text mt-4 rounded-lg bg-slate-100 p-5 text-slate-700">
            {data?.message?.choices?.map((choice) =>
              parse(choice?.message?.content || "")
            )}
          </div>
        )}
        <div className="mx-auto mt-4">
          <button
            className="btn   min-w-[120px]"
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
            Generate
          </button>
          <button
            className="btn ml-2 min-w-[120px]"
            onClick={() => {
              setTitle("");
              setKeywords(null);
              setTone(null);
              setDescription("");
              reset();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generator;
