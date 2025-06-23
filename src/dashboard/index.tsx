import React from 'react'
import { SidebarLayout } from "@/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const Index: React.FC = () => {
  return (
    <div className="py-10">
    <SidebarLayout title="Dashboard">
      <Button
          type="button"
          asChild
          className="mb-2 mt-5 ml-auto w-32 h-10 text-sm mr-20 hover:bg-black hover:text-white border border-black"
        >
          <Link to="/medicine/create">Add Medicine</Link>
        </Button>

    </SidebarLayout>
    </div>
  )
}

export default Index
