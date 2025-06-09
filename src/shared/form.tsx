import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FormProps {
  items: {
    title: string;
    placeholder: string;
    type: string;
    required: boolean;
  }[];
  image?: boolean;
}

const Form: React.FC<FormProps> = ({ items, image }: FormProps) => {
  const [imageFile, setImageFile] = useState<string[]>([]);

  const ImageFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    const files = Array.from(input.files);
    console.log("files", files);
    files.forEach((file) => {
      setImageFile((prevFiles) => [...prevFiles, URL.createObjectURL(file)]);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <text className="font-bold text-2xl"> Medicine </text>
      {items.map((item) => (
        <div key={item.title} className="p-3 w-1/4 mt-1">
          <text className="text-sm">{item.title} </text>
          {item.type === "text" && <Input placeholder={item.placeholder} />}
          {item.type === "textarea" && (
            <Textarea
              placeholder={item.placeholder}
              className="mb-4 h-full border-1 border-black w-full"
            />
          )}
          {item.type === "file" && (
            <div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={ImageFileChange}
              />
              <div className="flex flex-row gap-2 mt-2 overflow-x-auto max-w-full p-2 rounded">
                {imageFile.map((file, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 flex justify-center items-center"
                  >
                    <img
                      src={file}
                      alt={`Uploaded file ${index + 1}`}
                      className="object-cover w-40 h-40 border border-black rounded-2xl"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 bg-white rounded-full text-red-700 hover:text-red-400 shadow"
                      onClick={() => {
                        setImageFile((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <Button className="w-1/5 h-10 mt-10 text-sm bg-black text-white hover:bg-gray-800">
        Submit
      </Button>
    </div>
  );
};

export default Form;
