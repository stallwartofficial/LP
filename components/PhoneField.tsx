"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Phone input with a searchable country-code selector. Defaults to US. The
// composed value emitted upstream is "<dial> <number>", e.g. "+1 4155551234",
// or "" when no number is typed yet (so required-validation still fires).
type Country = { name: string; iso: string; dial: string };

// Broad list across every region; extend as needed. Flags are derived from ISO.
const COUNTRIES: Country[] = [
  { name: "United States", iso: "US", dial: "+1" },
  { name: "Canada", iso: "CA", dial: "+1" },
  { name: "United Kingdom", iso: "GB", dial: "+44" },
  { name: "India", iso: "IN", dial: "+91" },
  { name: "Australia", iso: "AU", dial: "+61" },
  { name: "United Arab Emirates", iso: "AE", dial: "+971" },
  { name: "Singapore", iso: "SG", dial: "+65" },
  { name: "Germany", iso: "DE", dial: "+49" },
  { name: "France", iso: "FR", dial: "+33" },
  { name: "Netherlands", iso: "NL", dial: "+31" },
  { name: "Ireland", iso: "IE", dial: "+353" },
  { name: "Spain", iso: "ES", dial: "+34" },
  { name: "Italy", iso: "IT", dial: "+39" },
  { name: "Portugal", iso: "PT", dial: "+351" },
  { name: "Switzerland", iso: "CH", dial: "+41" },
  { name: "Sweden", iso: "SE", dial: "+46" },
  { name: "Norway", iso: "NO", dial: "+47" },
  { name: "Denmark", iso: "DK", dial: "+45" },
  { name: "Finland", iso: "FI", dial: "+358" },
  { name: "Belgium", iso: "BE", dial: "+32" },
  { name: "Austria", iso: "AT", dial: "+43" },
  { name: "Poland", iso: "PL", dial: "+48" },
  { name: "Czechia", iso: "CZ", dial: "+420" },
  { name: "Greece", iso: "GR", dial: "+30" },
  { name: "Romania", iso: "RO", dial: "+40" },
  { name: "Hungary", iso: "HU", dial: "+36" },
  { name: "Ukraine", iso: "UA", dial: "+380" },
  { name: "Russia", iso: "RU", dial: "+7" },
  { name: "Turkey", iso: "TR", dial: "+90" },
  { name: "Israel", iso: "IL", dial: "+972" },
  { name: "Saudi Arabia", iso: "SA", dial: "+966" },
  { name: "Qatar", iso: "QA", dial: "+974" },
  { name: "Kuwait", iso: "KW", dial: "+965" },
  { name: "Bahrain", iso: "BH", dial: "+973" },
  { name: "Oman", iso: "OM", dial: "+968" },
  { name: "Egypt", iso: "EG", dial: "+20" },
  { name: "South Africa", iso: "ZA", dial: "+27" },
  { name: "Nigeria", iso: "NG", dial: "+234" },
  { name: "Kenya", iso: "KE", dial: "+254" },
  { name: "Ghana", iso: "GH", dial: "+233" },
  { name: "Morocco", iso: "MA", dial: "+212" },
  { name: "China", iso: "CN", dial: "+86" },
  { name: "Hong Kong", iso: "HK", dial: "+852" },
  { name: "Taiwan", iso: "TW", dial: "+886" },
  { name: "Japan", iso: "JP", dial: "+81" },
  { name: "South Korea", iso: "KR", dial: "+82" },
  { name: "Malaysia", iso: "MY", dial: "+60" },
  { name: "Indonesia", iso: "ID", dial: "+62" },
  { name: "Philippines", iso: "PH", dial: "+63" },
  { name: "Thailand", iso: "TH", dial: "+66" },
  { name: "Vietnam", iso: "VN", dial: "+84" },
  { name: "Bangladesh", iso: "BD", dial: "+880" },
  { name: "Pakistan", iso: "PK", dial: "+92" },
  { name: "Sri Lanka", iso: "LK", dial: "+94" },
  { name: "Nepal", iso: "NP", dial: "+977" },
  { name: "New Zealand", iso: "NZ", dial: "+64" },
  { name: "Brazil", iso: "BR", dial: "+55" },
  { name: "Mexico", iso: "MX", dial: "+52" },
  { name: "Argentina", iso: "AR", dial: "+54" },
  { name: "Chile", iso: "CL", dial: "+56" },
  { name: "Colombia", iso: "CO", dial: "+57" },
  { name: "Peru", iso: "PE", dial: "+51" },
];

// Flag images (emoji flags do not render on Windows). flagcdn serves tiny PNGs.
function Flag({ iso }: { iso: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${iso.toLowerCase()}.png`}
      width={20}
      height={15}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover"
    />
  );
}

export function PhoneField({
  value,
  onChange,
  invalid = false,
  id = "phone",
}: {
  value: string;
  onChange: (composed: string) => void;
  invalid?: boolean;
  id?: string;
}) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrap = useRef<HTMLDivElement>(null);

  // Seed the local number from an existing composed value once.
  useEffect(() => {
    if (!value) return;
    const m = COUNTRIES.find((c) => value.startsWith(c.dial + " "));
    if (m) {
      setCountry(m);
      setNumber(value.slice(m.dial.length + 1));
    } else {
      setNumber(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (open && wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const emit = (dial: string, num: string) => onChange(num.trim() ? `${dial} ${num.trim()}` : "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.iso.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div ref={wrap} className="relative">
      <div className={`flex overflow-hidden rounded-xl border ${invalid ? "border-red-500/60" : "border-[var(--hairline-strong)]"} transition-colors focus-within:border-[var(--accent)]`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select country code"
          className="flex shrink-0 items-center gap-1.5 border-r border-[var(--hairline)] px-3 py-3 text-sm text-[var(--fg)] hover:bg-[var(--hairline)]/30"
        >
          <Flag iso={country.iso} />
          <span className="text-[var(--fg)]/80">{country.dial}</span>
          <span aria-hidden="true" className="text-[var(--fg)]/40">▾</span>
        </button>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="415 555 0134"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            emit(country.dial, e.target.value);
          }}
          className="w-full bg-transparent px-4 py-3 outline-none placeholder:text-[var(--placeholder-fg)]"
        />
      </div>

      {open && (
        <div className="absolute z-20 mt-2 w-full max-w-xs overflow-hidden rounded-xl border border-[var(--hairline-strong)] bg-[var(--surface)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
          <div className="max-h-72 overflow-y-auto">
            <div className="sticky top-0 z-10 border-b border-[var(--hairline)] bg-[var(--surface)]">
              <input
                autoFocus
                type="text"
                placeholder="Search country or code…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[var(--placeholder-fg)]"
              />
            </div>
            <ul className="py-1">
            {filtered.map((c) => (
              <li key={c.iso + c.dial}>
                <button
                  type="button"
                  onClick={() => {
                    setCountry(c);
                    setOpen(false);
                    setQuery("");
                    emit(c.dial, number);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-[var(--hairline)]/40"
                >
                  <Flag iso={c.iso} />
                  <span className="flex-1 truncate text-[var(--fg)]/85">{c.name}</span>
                  <span className="text-[var(--fg)]/50">{c.dial}</span>
                </button>
              </li>
            ))}
              {filtered.length === 0 && (
                <li className="px-3 py-3 text-sm text-[var(--fg)]/50">No match</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
