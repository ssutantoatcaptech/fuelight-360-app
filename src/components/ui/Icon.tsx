const iconModules = import.meta.glob("../../assets/icons/*.svg", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

const icons: Record<string, string> = {};
for (const [path, mod] of Object.entries(iconModules)) {
  const name = path.split("/").pop()!.replace(".svg", "");
  icons[name] = mod.default;
}

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  /** Paint the icon with an SVG gradient def (by id) instead of currentColor. */
  gradientId?: string;
}

export default function Icon({ name, size = 20, className = "", gradientId }: IconProps) {
  const svg = icons[name];
  if (!svg) return null;

  const paint = gradientId ? `url(#${gradientId})` : "currentColor";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        "--fill-0": paint,
        "--stroke-0": paint,
      } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export const iconNames = Object.keys(icons);
