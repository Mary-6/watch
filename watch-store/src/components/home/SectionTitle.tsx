interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone">{subtitle}</p>
      <h2 className="font-display text-4xl font-light md:text-5xl">{title}</h2>
    </div>
  );
}
