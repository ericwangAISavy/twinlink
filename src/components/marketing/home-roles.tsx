"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type HomeRole = {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string | null;
};

const ALL = "all";
const uniq = (values: (string | null)[]) => [...new Set(values.filter((v): v is string => Boolean(v && v.trim())))].sort();

/** Compact open-roles list with department / location / type filters. Shows up to `limit` matches. */
export function HomeRoles({ roles, limit = 5 }: { roles: HomeRole[]; limit?: number }) {
  const [department, setDepartment] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [type, setType] = useState(ALL);
  const options = useMemo(() => ({
    department: uniq(roles.map(r => r.department)),
    location: uniq(roles.map(r => r.location)),
    type: uniq(roles.map(r => r.employmentType)),
  }), [roles]);
  const matches = roles.filter(r =>
    (department === ALL || r.department === department) &&
    (location === ALL || r.location === location) &&
    (type === ALL || r.employmentType === type));

  const select = (label: string, value: string, set: (v: string) => void, values: string[]) => (
    <label className="home-role-filter">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={event => set(event.target.value)}>
        <option value={ALL}>All {label.toLowerCase()}s</option>
        {values.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    </label>
  );

  return <>
    <div className="home-role-filters" role="group" aria-label="Filter open roles">
      {select("Department", department, setDepartment, options.department)}
      {select("Location", location, setLocation, options.location)}
      {select("Type", type, setType, options.type)}
      <p className="home-role-count" aria-live="polite">{matches.length} {matches.length === 1 ? "role" : "roles"}</p>
    </div>
    {matches.length ? <ul className="home-role-list">{matches.slice(0, limit).map(role => <li key={role.id}>
      <Link href={`/careers/${role.slug}`}>
        <span className="home-role-main">
          <span className="home-role-title">{role.title}</span>
          {role.department && <span className="home-role-badge">{role.department}</span>}
        </span>
        <span className="home-role-meta">{[role.location, role.employmentType].filter(Boolean).join(" · ")}</span>
        <span className="home-role-arrow" aria-hidden="true">→</span>
      </Link>
    </li>)}</ul> : <p className="home-role-empty">No roles match these filters. <Link href="/careers">Browse all roles</Link></p>}
  </>;
}
