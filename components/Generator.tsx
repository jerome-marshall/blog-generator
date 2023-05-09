import React, { FC } from "react"
import Input from "./ui/Input"
import CreatableSelect from "react-select/creatable"
import Select from "react-select"
import { useMutation } from "@tanstack/react-query"
import { keywordOptions, toneOptions } from "@/lib/data"

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

  const [title, setTitle] = React.useState()
  const [keywords, setKeywords] = React.useState(undefined)
  const [tone, setTone] = React.useState(undefined)
  const [description, setDescription] = React.useState("")

  console.log("🚀 ~ file: page.tsx:24 ~ Home ~ data:", data)

  return (
    <div>
      <div>
        <div className="flex items-center">
          <p className="input-label">Title: </p>
          <Input placeholder="Enter your title here" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex items-center">
          <p className="input-label">Keywords: </p>
          <CreatableSelect isMulti options={keywordOptions} value={keywords} onChange={(e) => setKeywords(e)} />
        </div>
        <div className="flex items-center">
          <p className="input-label">Tone: </p>
          <Select options={toneOptions} value={tone} onChange={(e) => setTone(e)} />
        </div>
        <div className="flex items-center">
          <p className="input-label">Description: </p>
          <Input placeholder="Enter your description here" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
      <div>
        <div>
          {data?.message?.choices?.map((choice) => (
            <>
              <p>{choice?.message?.content}</p>
            </>
          ))}
        </div>
        <button
          className="btn btn-primary text-slate-950"
          onClick={() => {
            const keywordsArray = keywords?.map((keyword) => keyword.value)
            const keywordsString = keywordsArray?.join(", ")

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
