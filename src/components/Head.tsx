export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Default SEO - will be overridden by page-specific SEO component */}
      <meta name="description" content="Australia's smartest loan marketplace. Get matched with 130+ lenders for car loans, home loans, and business finance. Free service, fast approval." />
      <meta name="keywords" content="car loan, home loan, mortgage broker, car finance, refinance, Australia" />
      <meta name="author" content="Nik Finance" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph defaults */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Nik Finance" />
      <meta property="og:locale" content="en_AU" />
      
      {/* Twitter defaults */}
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* Theme & Icons */}
      <meta name="theme-color" content="#0d4d3e" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
};
