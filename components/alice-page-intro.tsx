import Link from "next/link";

type Action = {
  href?: string;
  label: string;
  style?: "primary" | "secondary";
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Action[];
};

export function AlicePageIntro({ eyebrow, title, description, actions = [] }: Props) {
  return (
    <section className="alice-page-intro">
      <div>
        <span className="alice-kicker">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actions.length ? (
        <div className="alice-actions">
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
