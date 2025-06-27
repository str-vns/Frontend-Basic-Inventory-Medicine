import React from "react";
import { SidebarLayout } from "@/layout";
import SectionCard from "@/components/section-cards";
import { dataChartBar } from "@/data/dataChart";
import { BarChartComponent1 } from "@/shared/Dashboard/barChart";
import { ChartAreaIcons } from "@/shared/Dashboard/areaChart";
import { ChartLineDefault } from "@/shared/Dashboard/lineChart";
import { ChartPieLabelCustom } from "@/shared/Dashboard/pieChart";
const Index: React.FC = () => {
  return (
    <div className="py-10">
      <SidebarLayout title="Dashboard">
        <div className="my-4 mx-4 ">
          <SectionCard />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <BarChartComponent1 datas={dataChartBar} />
        </div>
        <div className="flex flex-col items-center justify-center ml-50 mt-10 ">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[1200px]'>
            <ChartAreaIcons />
            <ChartLineDefault />
            <ChartPieLabelCustom />
          </div>
          </div>
      </SidebarLayout>
    </div>
  );
};

export default Index;
