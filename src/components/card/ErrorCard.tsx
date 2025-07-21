import Link from "next/link";
import React from "react";

interface ErrorCardProps {
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
}

const ErrorCard: React.FC<ErrorCardProps> = ({ title, description, link }) => {
  return (
    <div className="w-full max-w-md rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm">{description}</p>
      {link && (
        <Link
          href={link.href}
          className="mt-2 inline-block text-sm text-red-600 hover:underline"
        >
          {link.label}
        </Link>
      )}
    </div>
  );
};

export default ErrorCard;
