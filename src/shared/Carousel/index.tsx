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
import { useGetInventory } from "@/api/Inventory/Api_Inventory";

interface CarouselThingsProps {
  invData?: InventoryData[];
  currentPageTitle?: string;
  med_id?: string;
  onRefresh?: () => void;
  returnInvData?: (data: InventoryData) => void;
}

const CarouselThings: React.FC<CarouselThingsProps> = ({
  invData,
  currentPageTitle,
  onRefresh,
  med_id,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState<InventoryData | undefined>(undefined);
  const deleteInventory = useGetInventory((state) => state.deleteInventory);

  const handleEdit = (id?: string) => {
    setIsEditing(true);
    setModalOpen(true);
    setEditData(invData?.find((item) => item.id === id));
  };
 
  const handleCreate = () => {
    setIsEditing(false);
    setModalOpen(true);
    setEditData(undefined);
  }

  const handleDelete = async(id?: string) => {
    if(id && deleteInventory){
      await deleteInventory(id);
      if(onRefresh) {
        onRefresh();
      }
    }
  }
  return (
    <div>
      <Carousel className="w-full max-w-xs ">
        <CarouselContent>
          <CarouselItem>
            <div className="p-1 ">
              <Card
                className="flex flex-col mt-1 py-6 h-full justify-center items-center cursor-pointer hover:shadow-lg transition px-19"
                onClick={() => handleCreate()}
              >
                  <span>
                    <Plus className="w-8 h-8" />
                  </span>
                <span className="font-semibold mt-[25px]">Create New Inventory</span>
              </Card>
            </div>
          </CarouselItem>

          {invData?.map((item, index) => (
            <CarouselItem key={index} className="w-full " >
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
                      <Button className="text-black hover:text-blue-500 cursor-pointer"
                      onClick={() => {handleEdit(
                         item.id,
                      )}}
                      >
                        <Syringe />
                      </Button>
                      <Button className="text-black hover:text-red-500 cursor-pointer" 
                      onClick={() => {handleDelete(item.id)}}
                      >
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
                      {item.medicine_price ? `$${item.medicine_price}` : "N/A"}
                    </span>
                    <span className="text-[12px]">
                      Quantity: {item.quantity ? `${item.quantity} pcs` : "N/A"}
                    </span>
                    <span className="text-[12px]">
                      Manufacturer:{" "}
                      {item.manufacturer ? item.manufacturer : "N/A"}
                    </span>
                    <span className="text-[12px]">
                      Expiration Date: {item.expiration_date ? (new Date(item.expiration_date).toDateString()) : "N/A"}
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
        <ModalAnalog
          onOpenChange={setModalOpen}
          isModalOpen={modalOpen}
          titles={currentPageTitle}
          medicineId={med_id}
          isEdit={isEditing}
          editData={isEditing ? editData : undefined}
          refreshSingle={onRefresh}
        />
      )}
    </div>
  );
};

export default CarouselThings;
