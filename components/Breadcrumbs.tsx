// components/Breadcrumbs.tsx

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumbs">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={index === items.length - 1 ? "text-gray-500" : ""}
          >
            {item.href ? (
              <Link href={item.href} passHref className=" hover:text-blue-800">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
