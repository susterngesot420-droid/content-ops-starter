import * as React from 'react';
import classNames from 'classnames';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';

interface DefaultBaseLayoutProps {
  page?: any;
  site?: any;
  children?: React.ReactNode;
}

const DefaultBaseLayout: React.FC<DefaultBaseLayoutProps> = ({ page, site, children }) => {
  const { enableAnnotations = true } = site || {};
  const pageMeta = page?.__metadata || {};

  return (
    <div
      className={classNames('sb-page', pageMeta.pageCssClasses)}
      {...(enableAnnotations && { 'data-sb-object-id': pageMeta.id })}
    >
      <div className="sb-base sb-default-base-layout">
        {site?.header && <Header {...site.header} enableAnnotations={enableAnnotations} />}
        {children}
        {site?.footer && <Footer {...site.footer} enableAnnotations={enableAnnotations} />}
      </div>
    </div>
  );
};

export default DefaultBaseLayout;

