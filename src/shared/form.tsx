import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { showToast } from "@/shared/Sonner/toast";
import { useGetMedicine } from "@/api/Medicine/Api_Medicine";

interface FormProps {
  items: {
    title: string;
    placeholder: string;
    type: string;
    required: boolean;
    isEdit?: boolean;
  }[];

  singleItem?: {
    medicine_name: string;
    medicine_desc: string;
    images: string[];
    img_id: string[];
  };
  image?: boolean;
  isEdit?: boolean;
  isLoading?: boolean;
  returnItems?: (medName: string, desc: string, imageFiles: string[]) => void;
}

const Form: React.FC<FormProps> = ({
  items,
  image,
  returnItems,
  singleItem,
  isLoading = false,
  isEdit = false,
}: FormProps) => {
  const delImg = useGetMedicine((state) => state.delImg);
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [medName, setMedName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [imgId, setImgId] = useState<string[]>([]);

  const ImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!input.files) return;

    if (imageFile.length >= 5) {
      showToast({
        title: "Image limit reached",
        description: "You can only upload up to 5 images.",
        position: "top-right",
        type: "error",
      });
      return;
    }

    const files = Array.from(input.files);
    files.forEach((file) => {
      const reader = new FileReader();
      if (file.size > 2 * 1024 * 1024) {
        showToast({
          title: "File too large",
          description: "Each image must be less than 2MB.",
          position: "top-right",
          type: "error",
        });
        return;
      } else {
        reader.onload = () => {
          if (reader.result) {
            setImageFile((prevFiles) => [
              ...prevFiles,
              reader.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);

        showToast({
          title: "Image added successfully",
          description: "You can add more images if needed.",
          position: "top-right",
          type: "success",
        });
      }
    });
  };

  const removeImg = (index: number) => {
    setImageFile((prevFiles) => {
      if (prevFiles.length === 1) {
        showToast({
          title: "Last image removed",
          description: "You have removed the last image.",
          position: "top-right",
          type: "info",
        });
        return [];
      }
      return prevFiles.filter((_, i) => i !== index);
    });

    if (imgId.length > 0) {
      if (delImg) {
        delImg(imgId[index]);
      }
      setImgId((prevIds) => prevIds.filter((_, i) => i !== index));
    }
    showToast({
      title: "Image removed",
      description: "The image has been removed successfully.",
      position: "top-right",
      type: "success",
    });
  };

  const handleSubmit = () => {
    if (!medName.trim() || !desc.trim() || imageFile.length === 0) {
      showToast({
        title: "Missing fields",
        description: "Please fill all fields and upload at least one image.",
        position: "top-right",
        type: "error",
      });
      return;
    }
    if (returnItems) {
      returnItems(medName, desc, imageFile);
    }
  };

  useEffect(() => {
    console.log("isEdit", singleItem);
    if (isEdit && singleItem) {
      console.log("run");
      setMedName(singleItem.medicine_name);
      setDesc(singleItem.medicine_desc);
      setImageFile(singleItem.images);
      setImgId(singleItem.img_id ? singleItem.img_id : []);

    } else {
      return;
    }
  }, [singleItem, isEdit]);

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="font-bold text-2xl"> Medicine </h1>
      {items.map((item) => (
        <div key={item.title} className="p-3 w-1/4 mt-1">
          <h1 className="text-sm">{item.title} </h1>
          {item.type === "text" && (
            <Input
              placeholder={item.placeholder}
              value={medName} 
              onChange={(e) => setMedName(e.target.value)}

            />
          )}
          {item.type === "textarea" && (
            <Textarea
              placeholder={item.placeholder}
              className="mb-4 h-full border-1 border-black w-full"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          )}
          {item.type === "file" && image && (
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
                        removeImg(index);
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

      <Button
        className="w-1/5 h-10 mt-10 text-sm bg-black text-white hover:bg-gray-800"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Submit
      </Button>
    </div>
  );
};

export default Form;
