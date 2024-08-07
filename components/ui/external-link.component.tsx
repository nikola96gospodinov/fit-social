import { Link } from "expo-router";
import { type ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export function ExternalLink({ href, ...rest }: Props) {
  return <Link target="_blank" {...rest} href={href} />;
}
