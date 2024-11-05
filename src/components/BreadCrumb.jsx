import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  if (location.pathname === '/') {
    return null;
  }
  // Helper function to format the breadcrumb text
  const formatBreadcrumb = (text) => text.replace(/-/g, '_').toUpperCase();

  return (
    <nav aria-label="breadcrumb ">
      <ol className="breadcrumb flex container mx-auto px-24 pt-4">
        {/* Home link always appears */}
        <li className="breadcrumb-item text-[#FF9900]">
          <Link className="me-2" to="/">Home</Link>
          {pathnames.length > 0 && <span> &gt; </span> } {/* Separator after Home if there are more segments */}
        </li>
        
        {/* Generate breadcrumb links for each path segment */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li className="breadcrumb-item active text-white ms-2" key={to} aria-current="page">
              {formatBreadcrumb(value)}
            </li>
          ) : (
            <li className="breadcrumb-item" key={to}>
              <Link to={to}>{formatBreadcrumb(value)}</Link>
              <span> &gt; </span> {/* Separator for intermediate segments */}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
