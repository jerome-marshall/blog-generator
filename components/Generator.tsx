import { keywordOptions, toneOptions } from "@/lib/data"
import { useMutation } from "@tanstack/react-query"
import React, { FC } from "react"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import Input from "./ui/Input"

const getData = async (props) => {
  console.log("🚀 ~ file: Generator.tsx:8 ~ getData ~ props:", props)
  // const response = await fetch("http://localhost:3000/api/generate", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     title: props.title,
  //     keywords: props.keywords,
  //     tone: props.tone,
  //   }),
  // })
  // const data = await response.json()
  // return data
}

interface GeneratorProps {}

const Generator: FC<GeneratorProps> = ({}) => {
  const { mutate, data } = useMutation({
    mutationFn: getData,
  })

  const [title, setTitle] = React.useState(undefined)
  const [keywords, setKeywords] = React.useState(undefined)
  const [tone, setTone] = React.useState(undefined)
  const [description, setDescription] = React.useState(undefined)

  console.log("🚀 ~ file: page.tsx:24 ~ Home ~ data:", data)

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
        <div className="flex items-center">
          <p className="input-label">Description: </p>
          <Input
            placeholder="Enter your description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-sm ml-2 text-slate-600">{"(optional)"}</p>
        </div>
      </div>
      <div className="border-t border-slate-300 mt-4">
        <div className="text-slate-700 mt-4 bg-slate-100 p-5 rounded-lg">
          <p>asdasdas</p>
          {data?.message?.choices?.map((choice) => (
            <>
              <p>{choice?.message?.content}</p>
            </>
          ))}
        </div>
        <button
          className="btn mt-4 mx-auto min-w-[120px]"
          onClick={() => {
            const keywordsString = keywords
              ?.map((keyword) => keyword.value)
              ?.join(", ")

            mutate({
              title,
              keywords: keywordsString,
              tone: tone?.value,
            })
          }}
        >
          Generate
        </button>
      </div>
    </div>
  )
}

export default Generator
