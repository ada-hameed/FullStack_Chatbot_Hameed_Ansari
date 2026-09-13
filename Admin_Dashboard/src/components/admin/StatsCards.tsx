interface StatsCardsProps {
  total: number;
  newCount: number;
  inProgress: number;
  closed: number;
}

const cards = [
  { key: "total", title: "Total Enquiries", icon: "bi-inbox", className: "text-bg-primary" },
  { key: "newCount", title: "New", icon: "bi-envelope", className: "text-bg-info" },
  { key: "inProgress", title: "In Progress", icon: "bi-hourglass-split", className: "text-bg-warning" },
  { key: "closed", title: "Closed", icon: "bi-check-circle", className: "text-bg-success" },
] as const;

export default function StatsCards({
  total,
  newCount,
  inProgress,
  closed,
}: StatsCardsProps) {
  const values = { total, newCount, inProgress, closed };

  return (
    <div className="row">
      {cards.map((card) => (
        <div className="col-lg-3 col-6" key={card.key}>
          <div className={`small-box ${card.className}`}>
            <div className="inner">
              <h3>{values[card.key]}</h3>
              <p>{card.title}</p>
            </div>
            <i className={`small-box-icon bi ${card.icon}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
