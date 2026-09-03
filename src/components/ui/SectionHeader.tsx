import Badge from "@/components/ui/Badge";

export default function SectionHeader({
  badge,
  title,
  desc,
  align = "left",
}: {
  badge?: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
      {badge ? (
        <div className={isCenter ? "flex justify-center" : ""}>
          <Badge>{badge}</Badge>
        </div>
      ) : null}

      <h2 className="mt-5 text-3xl font-semibold leading-[1.08] text-cocoa md:text-[2.5rem]">
        {title}
      </h2>

      {desc ? (
        <p
          className={`mt-4 text-sm leading-7 text-cocoa-soft ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}
