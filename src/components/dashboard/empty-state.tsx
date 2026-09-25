import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-3 py-10">
        <p className="font-serif text-xl">{title}</p>
        <p className="max-w-lg text-sm text-muted-foreground">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}
