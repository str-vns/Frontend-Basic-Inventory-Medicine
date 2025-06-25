import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

interface CalendarProps {
  selectedDate?: (data: string) => void;
  isClosed?: (closed: boolean) => void;
  isDate?: Date;
}

const CalendarComponent: React.FC<CalendarProps> = ({ selectedDate, isClosed, isDate }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  useEffect(() => {
    if (isDate) {
      setDate(isDate);
    }
  }, [isDate]);
  return (
    <div className="flex flex-col mt-5 items-center justify-center  rounded-lg shadow-lg">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            defaultMonth={date}
            className="w-full max-w-md rounded-lg shadow-md"
            onSelect={(dateValue) => {
              console.log("Selected date:", dateValue);
              if (dateValue) {
                setDate(dateValue);
                isClosed?.(true);
                selectedDate?.(dateValue.toLocaleDateString());
              }
            }}
          />

    </div>
  );
};

export default CalendarComponent;
