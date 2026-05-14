import { containerClass } from "@kpango/ui";
import type { Child, FC, PropsWithChildren } from "hono/jsx";
import { Layout } from "./Layout";
import { Footer, Nav } from "./Nav";

interface PageShellProps extends PropsWithChildren {
  title?: string;
  description?: string;
  path?: string;
  currentPath?: string;
  /** Extra class names appended to the <main> element. */
  mainClass?: string;
  head?: Child;
}

/**
 * Shared page wrapper: Layout → Nav → <main> → Footer.
 *
 * Every route page used to repeat this exact skeleton; now they render
 * `<PageShell>` and only provide the unique content.
 */
export const PageShell: FC<PageShellProps> = ({
  children,
  title,
  description,
  path,
  currentPath,
  mainClass = `${containerClass} py-12`,
  head,
}) => (
  <Layout title={title} description={description} path={path} head={head}>
    <Nav currentPath={currentPath ?? path} />
    <main class={mainClass}>{children}</main>
    <Footer />
  </Layout>
);
