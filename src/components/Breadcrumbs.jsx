import React from 'react';
import { Link, useLocation } from 'react-router';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm text-white">
      <ol className="flex gap-2 font-semibold text-lg">
        <li>
          <Link to="/" className="hover:underline text-blue-400 ">
            Home
          </Link>
        </li>
        {pathNames.map((value, index) => {
          const to = '/' + pathNames.slice(0, index + 1).join('/');
          const isLast = index === pathNames.length - 1;

          return (
            <li key={to} className="flex items-center gap-2">
              <span>&gt;</span>
              {
                isLast ? (
                  <span className="text-gray-300 capitalize">{value}</span>
                ) : (
                  <Link to={to} className="hover:underline text-blue-400 capitalize">
                    {value}
                  </Link>
                )
              }
            </li>
          );
        })}
      </ol>
    </nav>
  );
};