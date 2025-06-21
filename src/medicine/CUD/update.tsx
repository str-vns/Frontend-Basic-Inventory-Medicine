import { useEffect, useRef, useState } from "react";
import Form from "@shared/form";
import { SidebarLayout } from "@/layout";
import { useParams } from "react-router-dom";
import { useGetMedicine } from "@/api/Medicine/Api_Medicine";
import { MedicineState } from "@/types/medicine";
import { useNavigate } from "react-router-dom";
import { MedicineItem } from "@/types/medicine";
import { showToast } from "@/shared/Sonner/toast";

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

const Update = () => {
  const [datas, setData] = useState<MedicineState>();
  const getSingleData = useGetMedicine((state) => state.getSingleData);
  const updateMed = useGetMedicine((state) => state.updateMed);
  const { id } = useParams();
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current && id) {
      const fetchData = async () => {
        try {
          if (getSingleData) {
            const singleData = await getSingleData(id);
            console.log("Fetched single data:", singleData);

            if (singleData) {
              setData(singleData);
              hasFetchedRef.current = true;
            }
          } else {
            console.error("getSingleData is undefined");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      fetchData();
    }
  }, [getSingleData, id]);

  const handleSubmit = async (
    medName: string,
    desc: string,
    imageFiles: string[],
    id: string
  ) => {

    if (!medName || !desc || imageFiles.length === 0) return;

    const newItem: MedicineItem = {
      medicine_name: medName,
      medicine_desc: desc,
      images: imageFiles.filter((file) => "https://" !== file.slice(0, 8)),
    };
    
    const result = await updateMed(id, newItem);
    if (result) {
      navigate("/medicine");
      showToast({
        title: "Medicine updated successfully",
        description: "The medicine has been updated in the list.",
        position: "top-right",
        type: "success",
      });
    }
  };


  return (
    <div className="py-10">
      <SidebarLayout title="Update Medicine" main="Medicine">
        <Form
          items={items}
          image={true}
          isEdit={true}
          singleItem={
            datas
              ? {
                  medicine_name: datas.medicine_name,
                  medicine_desc: datas.medicine_desc,
                  images: datas.images.map((img) => img.url),
                  img_id: datas.images
                    .map((img) => img.id)
                    .filter((id): id is string => typeof id === "string"),
                }
              : undefined
          }
          returnItems={async (medName, desc, imageFiles) => {
            if (!medName || !desc || imageFiles.length === 0) return;
            handleSubmit(medName, desc, imageFiles, id ? id : "");
          }}
        />
      </SidebarLayout>
    </div>
  );
};

export default Update;
