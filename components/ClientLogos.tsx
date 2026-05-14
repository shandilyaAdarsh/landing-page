const clients = [
  "Schiphol", "Van der Valk", "Fletcher Hotels", "Bartel Groep",
  "GJB Horeca", "Van Asch", "Finnegan's", "Cobra Café", "Brasa", "De Gist",
];

export default function ClientLogos() {
  return (
    <section
      className="py-10 lg:py-14"
      style={{
        backgroundColor: "var(--bg-base)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      aria-label="Trusted by"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center text-sm font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Trusted by hundreds of businesses, including
        </p>

        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--bg-base), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--bg-base), transparent)",
            }}
          />

          <div className="flex animate-marquee gap-12 w-max">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="flex items-center justify-center px-6 py-3 rounded-xl border min-w-max"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border)",
                }}
              >
                <span
                  className="font-semibold text-sm whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
