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
}

export default function Icon({ name, size = 20, className = "" }: IconProps) {
  const svg = icons[name];
  if (!svg) return null;

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        "--fill-0": "currentColor",
        "--stroke-0": "currentColor",
      } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export const iconNames = Object.keys(icons);
