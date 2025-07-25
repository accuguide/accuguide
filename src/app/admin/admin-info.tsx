"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AdminInfoProps {
  links: { label: string; href: string }[];
  types: { type: string }[];
  indicators: { indicator: string }[];
  typeMappings: { id: string; type: string; pattern: string }[];
  typeIndicators: { id: string; type: string; indicator: string }[];
  typeSubmit: (value: string) => void;
}

export default function AdminInfo({
  links,
  types,
  indicators,
  typeMappings,
  typeIndicators,
  typeSubmit,
}: AdminInfoProps) {
  const [newType, setNewType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newType.trim()) {
      typeSubmit(newType.trim());
      setNewType("");
    }
  };

  return (
    <div>
      <h2>Important Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <h2>Types</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Add a new type"
          className="md:max-w-xs my-1"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
      </form>
      <ul>
        {types.map((type) => (
          <li key={type.type}>
            <p>{type.type}</p>
          </li>
        ))}
      </ul>
      <h2>Indicators</h2>
      <ul>
        {indicators.map((indicator) => (
          <li key={indicator.indicator}>
            <p>{indicator.indicator}</p>
          </li>
        ))}
      </ul>
      <h2>Type Mappings</h2>
      <ul>
        {typeMappings.map((mapping) => (
          <li key={mapping.id}>
            <p>
              {mapping.type} - {mapping.pattern}
            </p>
          </li>
        ))}
      </ul>
      <h2>Type Indicators</h2>
      <ul>
        {typeIndicators.map((indicator) => (
          <li key={indicator.id}>
            <p>
              {indicator.type} - {indicator.indicator}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
