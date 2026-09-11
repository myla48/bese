import { ArrowUpRight } from "lucide-react";

/**
 * Reusable CTA button.
 * variant: "solid" | "outline" | "ghost"
 */
export default function Button({
  as: Tag = "a",
  href,
  onClick,
  children,
  variant = "solid",
  icon = true,
  className = "",
  ...rest
}) {
  const base =
    "group relative inline-flex items-center gap-2.5 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ease-out";

  const variants = {
    solid:
      "bg-ink text-void hover:bg-blue-bright hover:text-ink",
    outline:
      "border border-mist-dim text-ink hover:border-blue-bright hover:text-blue-bright",
    ghost: "text-mist hover:text-ink",
  };

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Tag>
  );
}
