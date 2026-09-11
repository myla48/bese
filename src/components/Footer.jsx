import { Send, SquarePlay, Mail } from "lucide-react";
import { socialLinks } from "../data/navigation";

const icons = {
  telegram: Send,
  youtube: SquarePlay,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="border-t border-mist-dim/15 bg-void px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg text-ink">Besufikad Zerihun</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-dim">
            Cinematographer &amp; Video Editor
          </p>
        </div>

        <div className="flex items-center gap-5">
          {Object.entries(socialLinks).map(([key, link]) => {
            const Icon = icons[key];
            return (
              <a
                key={key}
                href={link.href}
                target={key !== "email" ? "_blank" : undefined}
                rel={key !== "email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="text-mist transition-colors duration-300 hover:text-blue-bright"
              >
                <Icon size={17} strokeWidth={1.25} />
              </a>
            );
          })}
        </div>

        <p className="font-mono text-[10px] tracking-[0.1em] text-mist-dim">
          &copy; 2026 Besufikad Zerihun. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
