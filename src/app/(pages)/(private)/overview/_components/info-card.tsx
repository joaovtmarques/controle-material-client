import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface InfoCardProps {
  title: string;
  value: string;
  text: string;
  icon: JSX.Element;
  isLoading: boolean;
}

export default function InfoCard({ title, value, text, icon, isLoading }: InfoCardProps) {
  return (
    <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-medium text-sm">
          {title}
        </h1>
        {icon}
      </div>
      <div className={isLoading ? "flex flex-col gap-2 w-full" : "w-full"}>
        {isLoading ? 
          <Skeleton className="w-full h-8 rounded-full animate-pulse bg-zinc-800" />
          :
          <h3 className="font-bold text-2xl">{value}</h3>
        }
        {isLoading ? 
          <Skeleton className="w-full h-4 rounded-full animate-pulse bg-zinc-800" />
          :
          <p className="font-regular text-zinc-400 text-xs">{text}</p>
        }
      </div>
    </Card>
  )
}