import React from 'react'
import { SidebarLayout } from "@/layout";
import SectionCard from '@/components/section-cards';

const Index: React.FC = () => {
  return (
    <div className="py-10">
    <SidebarLayout title="Dashboard">
      <div className='my-4 mx-4'>
        <SectionCard />
      </div>
    </SidebarLayout>
    </div>
  )
}

export default Index
