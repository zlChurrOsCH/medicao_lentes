import React from 'react';
import { Helmet } from 'react-helmet';

const PageWrapper = ({ title, children }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default PageWrapper;
