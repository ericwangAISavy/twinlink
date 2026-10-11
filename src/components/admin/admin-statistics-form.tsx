import { ActionForm } from "@/components/action-form";
import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { parseStatistics } from "@/lib/company-statistics";
import { adminSaveStatistics } from "@/server/actions/admin";

export function AdminStatisticsForm({ body }: { body: string | null }) {
  return (
    <ActionForm
      action={adminSaveStatistics}
      submitLabel="Save homepage numbers"
    >
      <h2 className="font-serif text-2xl">Homepage numbers</h2>
      <p className="text-sm text-muted-foreground">
        Enter a number, optionally followed by +. Use figures you can
        substantiate.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {parseStatistics(body).map((stat, index) => (
          <Field key={stat.label} htmlFor={`stat-${index}`} label={stat.label}>
            <Input
              id={`stat-${index}`}
              name={`stat-${index}`}
              defaultValue={stat.value}
              pattern="[0-9]{1,9}(\.[0-9]{1,2})?\+?"
              maxLength={13}
              required
            />
          </Field>
        ))}
      </div>
    </ActionForm>
  );
}
