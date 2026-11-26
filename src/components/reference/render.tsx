import Link from "next/link";
import { createElement, Fragment } from "react";
import { Fade } from "./fade";
import { Faq } from "./faq";
import { HeroDots } from "./hero-dots";
import { InertForm } from "./inert-form";
import { Swap } from "./swap";

/** Captured page markup: text, or [element or component name, props, children]. */
export type ContentNode = string | [string, Record<string, unknown>, ContentNode[]];

const COMPONENTS: Record<string, React.ElementType> = { Link, Fade, Faq, HeroDots, Form: InertForm };

export function render(node: ContentNode, key: number): React.ReactNode {
  if (typeof node === "string") return node;
  const [name, props, children] = node;
  if (name === "Swap") {
    const states = props.states as ContentNode[];
    return <Swap key={key} initial={props.initial as number} states={states.map((state, index) => <Fragment key={index}>{render(state, 0)}</Fragment>)} />;
  }
  return createElement(COMPONENTS[name] ?? name, { ...props, key }, ...(children.length ? [children.map(render)] : []));
}
