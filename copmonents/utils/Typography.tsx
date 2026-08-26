import clsx from "clsx";
import { ElementType, ReactNode } from "react";

const variants = {
  hero: "text-6xl md:text-8xl font-extrabold leading-none tracking-tight",
  h1: "text-4xl md:text-6xl font-bold leading-tight",
  h2: "text-3xl md:text-5xl font-semibold leading-tight",
  h3: "text-2xl md:text-4xl font-semibold",

  title: "text-3xl font-semibold tracking-tight",

  name: "text-2xl font-bold uppercase tracking-wider",

  subtitle: "text-sm md:text-base uppercase tracking-[4px]",

  body: "text-base md:text-lg leading-7",

  caption: "text-sm",

  overline: "uppercase tracking-[6px] text-sm font-semibold",
} as const;

type TypographyProps = {
  as?: ElementType;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
};

const Typography = ({
  as: Component = "p",
  variant = "body",
  className,
  children,
}: TypographyProps) => {
  return (
    <Component className={clsx(variants[variant], className)}>
      {children}
    </Component>
  );
};

export default Typography;