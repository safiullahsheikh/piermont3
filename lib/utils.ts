import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn's class helper, which the 21st.dev components in app/vendor/21st import as "@/lib/utils".
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
