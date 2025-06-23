import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { InventoryData } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { Plus, Syringe, Trash } from "lucide-react";
import { ModalAnalog } from "@/shared/Modal/index";

interface CarouselThingsProps {
  invData?: InventoryData[];
  currentPageTitle?: string;
}

const CarouselThings: React.FC<CarouselThingsProps> = ({ invData, currentPageTitle }) => {
  const expDate: Date | undefined =
    invData && invData.length > 0
      ? new Date(invData.map((item) => item.expiration_date)[0])
      : undefined;
  const [modalOpen, setModalOpen] = React.useState(false);
  const dateExpired: string = expDate?.toDateString() || "N/A";

  return (
    <div>
      <Carousel className="w-full max-w-xs ">
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
                <Card className="flex flex-col h-full justify-center items-center cursor-pointer hover:shadow-lg transition"  onClick={() => setModalOpen(true)}>
                  <Button
                    className="text-black hover:text-green-500 cursor-pointer mb-4"
                    size="icon"
                    asChild
                    onClick={() => setModalOpen(true)}
                  >
                    <span>
                      <Plus className="w-12 h-12" />
                    </span>
                  </Button>
                  <span className="font-semibold mt-2">
                    Create New Inventory
                  </span>
                </Card>
            </div>
          </CarouselItem>

          {invData?.map((item, index) => (
            <CarouselItem key={index} className="w-full ">
              <div className="p-1">
                <Card className="flex flex-col h-full">
                  <div className="flex items-end justify-between w-full gap-2 -mt-5 pr-5 border-b">
                    <div className="flex items-center ">
                      <p className="text-[12px] flex flex-row items-center p-2">
                        <span
                          className={`inline-block rounded-full w-3 h-3 ${
                            item.onActive ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                        <span className="ml-1">
                          {item.onActive ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="text-black hover:text-blue-500 cursor-pointer">
                        <Syringe />
                      </Button>
                      <Button className="text-black hover:text-red-500 cursor-pointer">
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="flex flex-col items-start justify-center -mt-3 -mb-2">
                    <span className="text-[12px]">
                      Label: {item.medicine_measurement} {item.medicine_type}
                    </span>
                    <span className="text-[12px]">
                      Price:{" "}
                      {item.medicine_price
                        ? `$${item.medicine_price.toFixed(2)}`
                        : "N/A"}
                    </span>
                    <span className="text-[12px]">
                      Quantity: {item.quantity ? `${item.quantity} pcs` : "N/A"}
                    </span>
                    <span className="text-[12px]">
                      Manufacturer:{" "}
                      {item.manufacturer ? item.manufacturer : "N/A"}
                    </span>
                    <span className="text-[12px]">
                      Expiration Date: {dateExpired ? dateExpired : "N/A"}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-black hover:text-white" />
        <CarouselNext className="hover:bg-black hover:text-white" />
      </Carousel>
      {modalOpen && (
        <ModalAnalog onOpenChange={setModalOpen} isModalOpen={modalOpen} titles={currentPageTitle}/>
      )}
    </div>
  );
};

export default CarouselThings;
