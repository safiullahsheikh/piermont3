import Image from "next/image";

type BrandLogoProps = {
  /** `light` → LogoW (navy on light). `dark` → LogoP (white on navy). */
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "light",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const src = variant === "dark" ? "/LogoP.png" : "/LogoW.png";

  return (
    <Image
      src={src}
      alt="Piermont Studios"
      width={200}
      height={200}
      priority={priority}
      className={`brand-logo brand-logo-${variant} ${className}`.trim()}
    />
  );
}
