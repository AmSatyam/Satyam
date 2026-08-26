import clsx from "clsx";
import { ElementType, ReactNode } from "react";
const variants = {
  hero: "text-6xl md:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-extrabold leading-none tracking-tight",
  h1: "text-4xl md:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold leading-tight",
  h2: "text-3xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-semibold leading-tight",
  h3: "text-2xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-semibold",
  title: "text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold tracking-tight",
  name: "text-2xl 2xl:text-3xl 3xl:text-4xl font-bold uppercase tracking-wider",
  subtitle:
    "text-sm md:text-base 2xl:text-lg 3xl:text-xl uppercase tracking-[4px]",
  body: "text-base md:text-lg 2xl:text-xl 3xl:text-2xl leading-7 2xl:leading-8",
  caption: "text-sm 2xl:text-base 3xl:text-lg",
  overline:
    "uppercase tracking-[6px] text-sm 2xl:text-base 3xl:text-lg font-semibold",
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
      {" "}
      {children}{" "}
    </Component>
  );
};
export default Typography;
