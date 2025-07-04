import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { CalendarFold, X } from "lucide-react";
import CalendarComponent from "../Calendar/index";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropDown } from "../DropDown/index";
import { itemsList } from "@/data/medData";
import { showToast } from "../Sonner/toast";
import { devWarn } from "@/utils/generalHelpers";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { InventoryData } from "@/types/inventory";
import { useGetInventory } from "@/api/Inventory/Api_Inventory";

interface ModalAnalogProps {
  onOpenChange?: (open: boolean) => void;
  isModalOpen?: boolean;
  item?: undefined | null;
  isEdit?: boolean;
  titles?: string;
  medicineId?: string;
  editData?: InventoryData;
  refreshSingle?: () => void;
}

export const ModalAnalog: React.FC<ModalAnalogProps> = ({
  onOpenChange,
  isModalOpen,
  titles,
  medicineId,
  isEdit,
  editData,
  refreshSingle,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>("");
  const [selectValueMeasurement, setSelectValueMeasurement] =
    useState<number>(1);
  const [selectMeasurement, setSelectMeasurement] = useState<string>("");
  const [price, setPrice] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [manufacturer, setManufacturer] = useState<string>("");
  const addInventory = useGetInventory((state) => state.addInventory);
  const updateInventory = useGetInventory((state) => state.updateInventory);

  useEffect(() => {
    if (isEdit && editData) {
      setPrice(Number(editData.medicine_price));
      setQuantity(Number(editData.quantity));
      setManufacturer(editData.manufacturer);
      setSelectType(editData.medicine_type);
      const measurementParts = editData.medicine_measurement.split(" ");
      setSelectValueMeasurement(Number(measurementParts[0]));
      setSelectMeasurement(measurementParts[1]);
      const expirationDate = new Date(editData.expiration_date);
      setDate(expirationDate);
    }
  }, [isEdit, editData]);

  const handleItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    {
      if (title === "Price") {
        setPrice(Number(e.target.value));
      } else if (title === "Quantity") {
        setQuantity(Number(e.target.value));
      } else if (title === "Manufacturer") {
        setManufacturer(e.target.value);
      } else if (title === "Medicine Type") {
        setSelectType(e.target.value);
      } else if (title === "Medicine Measurement") {
        setSelectMeasurement(e.target.value);
        setSelectValueMeasurement(Number(e.target.value));
      }
    }
  };

  const handleCreate = async (id: string) => {
    if (
      !manufacturer ||
      !price ||
      !quantity ||
      !selectType ||
      !selectMeasurement ||
      !date
    ) {
      devWarn("All fields are required");
      showToast({
        title: "All fields are required",
        description: "Please fill in all the fields before proceeding.",
        type: "warning",
      });
      return;
    } else if (price < 1 || quantity < 1) {
      devWarn("Price and quantity must be greater than 0");
      showToast({
        title: "Price and quantity must be greater than 0",
        description: "Please enter valid values for price and quantity.",
        type: "warning",
      });
      return;
    } else if (manufacturer.trim() === "") {
      devWarn("Manufacturer is required");
      showToast({
        title: "Manufacturer is required",
        description: "Please enter a valid manufacturer.",
        type: "warning",
      });
      return;
    } else if (manufacturer.length < 3) {
      devWarn("Manufacturer name must be at least 3 characters long");
      showToast({
        title: "Manufacturer name must be at least 3 characters long",
        description: "Please enter a valid manufacturer name.",
        type: "warning",
      });
    } else if (
      price !== Number(price) ||
      quantity !== Number(quantity) ||
      selectValueMeasurement !== Number(selectValueMeasurement)
    ) {
      devWarn("Price and quantity must be valid numbers");
      showToast({
        title: "Price and quantity must be valid numbers",
        description: "Please enter valid values for price and quantity.",
        type: "warning",
      });
      return;
    }

    const itemData: InventoryData = {
      medicine_price: price.toString(),
      quantity: quantity.toString(),
      manufacturer: manufacturer,
      medicine_type: selectType,
      medicine_measurement: selectValueMeasurement + " " + selectMeasurement,
      expiration_date: date
        ? `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`
        : "",
      medicine_id: medicineId || "",
    };

    if (updateInventory && isEdit) {
      await updateInventory(id || "", itemData);
      onOpenChange?.(false);
      refreshSingle?.();
    } else if (addInventory) {
      await addInventory(itemData);
      onOpenChange?.(false);
      refreshSingle?.();
    }
  };

  return (
    <div>
      <AlertDialog open={isModalOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent
          className="bg-white -p-1 rounded-3xl w-89 max-h-[70vh] 
        overflow-y-scroll scrollbar-hide"
        >
          <AlertDialogHeader
            className="flex items-start border-b p-3 
          bg-black rounded-t-2xl justify-between items-center flex flex-row"
          >
            <AlertDialogTitle className="text-white font-sans text-md">
              {titles || "NO Title"}
            </AlertDialogTitle>
            <AlertDialogAction className="text-white hover:text-red-500">
              <X />
            </AlertDialogAction>
          </AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
          {itemsList.map((item) => (
            <div key={item.title}>
              {(item.type === "text" || item.type === "number") && (
                <div className="px-3">
                  <h4 className="text-black font-sans text-sm">{item.title}</h4>
                  <Input
                    placeholder={item.placeholder}
                    className="w-full p-2 mt-2"
                    required={item.required}
                    type={item.type}
                    max={item.type === "text" ? undefined : 100}
                    min={item.type === "text" ? undefined : 1}
                    step={item.type === "text" ? undefined : 1}
                    onChange={(e) => handleItem(e, item.title)}
                    value={
                      item.title === "Price"
                        ? price.toString()
                        : item.title === "Quantity"
                        ? quantity.toString()
                        : item.title === "Manufacturer"
                        ? manufacturer
                        : ""
                    }
                  />
                </div>
              )}

              {item.type === "Select" && (
                <div className="px-3 mt-2  gap-2 flex-row">
                  <h4 className="text-black font-sans text-sm">{item.title}</h4>
                  <div className="flex flex-row gap-2">
                    {item.title === "Medicine Measurement" && (
                      <Input
                        placeholder={item.placeholder}
                        className="w-20 p-2 mt-2"
                        required={item.required}
                        type={"number"}
                        max={1000}
                        min={1}
                        step={1}
                        value={
                          item.title === "Medicine Measurement"
                            ? selectValueMeasurement
                            : ""
                        }
                        onChange={(e) =>
                          setSelectValueMeasurement(Number(e.target.value))
                        }
                      />
                    )}
                    <DropDown
                      isType={item.title}
                      selectType={(data) => setSelectType(data)}
                      selectMeasurement={(data) => setSelectMeasurement(data)}
                      setTypes={selectType}
                      setMesurement={selectMeasurement}
                    />
                  </div>
                </div>
              )}

              {item.type === "Calendar" && (
                <div className="px-3 mt-2">
                  <h4 className="text-black font-sans text-sm">
                    Expiration Date
                  </h4>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Select date"
                      className="w-full p-2 mt-2"
                      value={date ? date.toLocaleDateString() : ""}
                      readOnly
                    />
                    <Button
                      className="mt-2 cursor-pointer hover:bg-black hover:text-white"
                      variant="outline"
                      id="date"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      <CalendarFold className="w-4 h-4" />
                    </Button>
                  </div>
                  {isCalendarOpen && (
                    <CalendarComponent
                      selectedDate={(data: string) => setDate(new Date(data))}
                      isClosed={(closed: boolean) => setIsCalendarOpen(!closed)}
                      isDate={date}
                    />
                  )}
                </div>
              )}
            </div>
          ))}

          <AlertDialogFooter className="p-3 ">
            <Button
              className={"w-full hover:text-green-600 border-none text-md"}
              onClick={() => handleCreate(editData?.id || "")}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
