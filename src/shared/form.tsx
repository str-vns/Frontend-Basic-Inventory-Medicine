import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
interface FormProps {
    items: {
        title: string;
        placeholder: string;
        type: string;
        required: boolean;
    }[];
}

const Form = ({ items }: FormProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <text className="font-bold text-2xl"> Medicine </text>
      {items.map((item) => (
        <div key={item.title} className="p-3 w-1/4 ">
          <text className="text-sm">{item.title} </text>
          {item.type === "textarea" ? (
            <Textarea placeholder={item.placeholder} className="mb-4 h-full border-1 border-black w-full" />
          ) : (
            <Input placeholder={item.placeholder} />
          )}
        </div>
      ))}
        <Button className="w-1/5 h-10 mt-10 text-sm bg-black text-white hover:bg-gray-800">
            Submit
        </Button>
    </div>
  );
}

export default Form;
