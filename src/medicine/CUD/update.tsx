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
  }
]

function Update() {
  return (
    <div className="container py-10">
      <SidebarLayout title="Update Medicine" main='Medicine'>
        <Form items={items} />
      </SidebarLayout>
    </div>
  )
}

export default Update
