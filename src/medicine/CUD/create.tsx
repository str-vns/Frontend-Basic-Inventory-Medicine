import React from "react";
import Form from "@shared/form";
import { SidebarLayout } from "@/layout";
import { useGetMedicine } from "@/api/Medicine/Api_Medicine";
import { MedicineItem } from "@/types/medicine";
import { useNavigate } from "react-router-dom";
const items = [
  {
    title: "Medicine Name",
    placeholder: "Enter medicine name",
    type: "text",
    required: true,
  },
  {
    title: "Description",
    placeholder: "Enter a description",
    type: "textarea",
    required: true,
  },
  {
    title: "Image",
    placeholder: "Upload an image",
    type: "file",
    required: true,
  },
];

const Create = () => {
  const addCreate = useGetMedicine((state) => state.addCreate);
  const { success } = useGetMedicine();
  const navigate = useNavigate();

  const handleSubmit = async (medName: string, desc: string, imageFiles: string[]) => {
    if (!medName || !desc || imageFiles.length === 0) return;
    const newItem: MedicineItem = {
      medicine_name: medName,
      medicine_desc: desc,
      images: imageFiles,
    };
    await addCreate(newItem);
  };

  // Only navigate after successful creation
  React.useEffect(() => {
    if (success) {
      navigate("/medicine");
    }
  }, [success, navigate]);

  return (
    <div className="py-10">
      <SidebarLayout title="Create Medicine" main="Medicine">
        <Form
          items={items}
          image={true}
          returnItems={async (medName, desc, imageFiles) => {
            if (!medName || !desc || imageFiles.length === 0) return;
            handleSubmit(medName, desc, imageFiles);
          }}
        />
      </SidebarLayout>
    </div>
  );
};

export default Create;
