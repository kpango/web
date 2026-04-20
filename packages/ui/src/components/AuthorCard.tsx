import type { FC } from "hono/jsx";
import { cn } from "../lib/cn";
import { cardClass, textPrimary, textSecondary } from "../lib/styles";

export interface AuthorCardProps {
  name: string;
  title: string;
  githubUrl: string;
  githubHandle: string;
}

export const AuthorCard: FC<AuthorCardProps> = ({ name, title, githubUrl, githubHandle }) => (
  <div class={cn("mt-8 flex items-center gap-4 p-5", cardClass)}>
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
      {name.charAt(0)}
    </div>
    <div>
      <p class={cn("font-semibold", textPrimary)}>{name}</p>
      <p class={cn("text-sm", textSecondary)}>
        {title} ·{" "}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline"
        >
          @{githubHandle}
        </a>
      </p>
    </div>
  </div>
);
