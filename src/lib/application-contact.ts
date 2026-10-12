import { z } from "zod";

export const httpsLink = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password;
    } catch {
      return false;
    }
  }, "Use an HTTPS link without a username or password.")
  .transform((value) => (value ? new URL(value).toString() : ""));
export const applicationContactSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  phone: z
    .string()
    .trim()
    .min(7, "Enter your phone number, including country code.")
    .max(40)
    .refine(
      (value) =>
        /^[+0-9().\s-]+$/.test(value) &&
        value.replace(/\D/g, "").length >= 7 &&
        value.replace(/\D/g, "").length <= 20,
      "Enter a valid phone number.",
    ),
  address: z.string().trim().min(5, "Enter your address.").max(600),
  social: httpsLink,
});
