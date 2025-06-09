import React from 'react'
import Form from '@shared/form'
import { SidebarLayout } from "@/layout";

const items = [
  {
    title: "Medicine Name",
    placeholder: "Enter medicine name",
    type: "text",
    required: true
  },
  {
    title: "Description",
    placeholder: "Enter a description",
    type: "textarea",
    required: true
  },
  {
    title: "Image",
    placeholder: "Upload an image",
    type: "file",
    required: true
  }
]

const Create = () => {
  const [medName, setMedName] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [imageFiles, setImageFiles] = React.useState<string[]>([]);

  console.log("medName", medName);
  return (
   <div className="py-10">
      <SidebarLayout title="Create Medicine" main='Medicine'>
        <Form items={items} image={true} returnItems={(medName, desc, imageFiles) => {
          setMedName(medName);
          setDesc(desc);
          setImageFiles(imageFiles);
        }}/>
      </SidebarLayout>
    </div>
  )
}

export default Create
