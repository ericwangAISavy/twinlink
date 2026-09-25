import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export function JobCard({
  slug,
  title,
  location,
  employmentType,
  description,
  publishedAt,
  href,
}: {
  slug: string;
  title: string;
  location: string | null;
  employmentType: string | null;
  description: string;
  publishedAt: Date | string | null;
  href?: string;
}) {
  return (
    <Link href={href ?? `/careers/${slug}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {employmentType ? <Badge variant="teal">{employmentType}</Badge> : null}
            {location ? <Badge variant="outline">{location}</Badge> : null}
          </div>
          <CardTitle className="mt-3">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p>
          <p className="mt-4 text-xs text-muted-foreground">Posted {formatDate(publishedAt)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
