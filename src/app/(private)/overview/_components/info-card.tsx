import { Card } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  value: string;
  text: string;
  icon: JSX.Element;
}

export default function InfoCard({ title, value, text, icon }: InfoCardProps) {
  return (
    <Card className="w-full h-auto flex flex-col gap-2 items-center p-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-medium text-sm">
          {title}
        </h1>
        {icon}
      </div>
      <div className="w-full">
        <h3 className="font-bold text-2xl">{value}</h3>
        <p className="font-regular text-zinc-400 text-xs">{text}</p>
      </div>
    </Card>
  )
}