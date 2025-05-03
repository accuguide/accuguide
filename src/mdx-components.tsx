import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="text-xl">{children}</h2>,
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mt-2">{children}</h3>
    ),
    h4: ({ children }) => <h4 className="font-bold mt-2">{children}</h4>,
    li: ({ children }) => (
      <li className="ml-4 list-disc text-muted-foreground text-sm">
        {children}
      </li>
    ),
    ...components,
  };
}
