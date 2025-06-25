import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { medType, medMeasurement } from "@/data/medData";

interface DropDownProps {
  isType: string;
  selectType?: (data: string) => void;
  selectMeasurement?: (data: string) => void;
  setTypes?: string;
  setMesurement?: string;
}

export const DropDown: React.FC<DropDownProps> = ({ selectType, selectMeasurement, isType, setTypes, setMesurement }) => {
    const itemList = isType === "Medicine Type" ? medType : medMeasurement;
    const [selectedType, setSelectedType] = useState("");
    const [selectedMeasurement, setSelectedMeasurement] = useState("");
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      setSelectedType(setTypes ?? "");
      setSelectedMeasurement(setMesurement ?? "");
    }, [setTypes, setMesurement])
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-2">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isType === "Medicine Type"
            ? (selectedType ? `${selectedType} ${isOpen ? "▲" : "▼"}` : `Select an option ${isOpen ? "▲" : "▼"}`)
            : (selectedMeasurement ? `${selectedMeasurement} ${isOpen ? "▲" : "▼"}` : `Select an option ${isOpen ? "▲" : "▼"}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg ">
        <DropdownMenuLabel>{isType}</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-b"/>
        <DropdownMenuRadioGroup
          value={isType === 'Medicine Type' ? selectedType : selectedMeasurement }
          onValueChange={(value) => {
            if (isType === 'Medicine Type') {
              setSelectedType(value);
              selectType?.(value);
              setIsOpen(false);
            } else {
              setSelectedMeasurement(value);
              selectMeasurement?.(value);
                setIsOpen(false);
            }
          }}
        >
          {itemList.map((item, index) => (
            <DropdownMenuRadioItem key={index} value={item}>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
