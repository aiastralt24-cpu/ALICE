import Link from "next/link";

type Action = {
  href?: string;
  label: string;
  style?: "primary" | "secondary";
};

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: Action[];
  variant?: "hero" | "section" | "detail";
};

export function AlicePageIntro({ eyebrow, title, description, actions = [], variant = "section" }: Props) {
  return (
    <section className={`alice-page-intro alice-page-intro-${variant}`}>
      <div>
        <span className="alice-kicker">{eyebrow}</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions.length ? (
        <div className="alice-page-actions">
          {actions.map((action) =>
            action.href ? (
              <Link className={`button ${action.style === "secondary" ? "button-secondary" : "button-primary"}`} href={action.href} key={action.label}>
                {action.label}
              </Link>
            ) : (
              <button className={`button ${action.style === "secondary" ? "button-secondary" : "button-primary"}`} key={action.label} type="button">
                {action.label}
              </button>
            ),
          )}
        </div>
      ) : null}
    </section>
  );
}
