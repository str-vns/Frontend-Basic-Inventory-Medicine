import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sectionData } from "@/data/sectionData";

const SectionCard = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {sectionData.map((section) => (
        <Card key={section.id} className='border w-full'>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>{section.number}</CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SectionCard;
