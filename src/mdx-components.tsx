import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => (
      <a href={href} {...props} className="hover:underline hover:opacity-75">
        {children}
      </a>
    ),
    ...components,
  };
}
