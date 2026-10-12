import { Field } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ApplicationContactFields({
  email = "",
  prefix = "application",
}: {
  email?: string;
  prefix?: string;
}) {
  return (
    <div className="space-y-4">
      <Field htmlFor={`${prefix}-email`} label="Email">
        <Input
          id={`${prefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={email}
          required
          maxLength={254}
        />
      </Field>
      <Field htmlFor={`${prefix}-phone`} label="Phone">
        <Input
          id={`${prefix}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          minLength={7}
          maxLength={40}
          placeholder="+86 138 0000 0000"
        />
      </Field>
      <Field htmlFor={`${prefix}-address`} label="Address">
        <Textarea
          id={`${prefix}-address`}
          name="address"
          autoComplete="street-address"
          required
          minLength={5}
          maxLength={600}
          rows={2}
          placeholder="Street address, city, region, postal code and country"
        />
      </Field>
      <Field
        htmlFor={`${prefix}-social`}
        label="Professional social profile (optional)"
      >
        <Input
          id={`${prefix}-social`}
          name="social"
          type="url"
          maxLength={2048}
          placeholder="https://www.linkedin.com/in/your-profile"
        />
      </Field>
    </div>
  );
}
