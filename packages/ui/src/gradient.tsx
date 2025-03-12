interface GradientProps {
  small?: boolean;
  conic?: boolean;
  className?: string;
}

export function Gradient({ conic, className, small }: GradientProps) {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? "blur-[32px]" : "blur-[75px]"
      } ${conic ? "bg-glow-conic" : ""} ${className ?? ""}`}
    />
  );
} 