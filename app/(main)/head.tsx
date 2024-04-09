import Script from "next/script";

export default function Head() {
  return (
    <>
      <Script
        id="gtm"
        src="https://www.googletagmanager.com/gtag/js?id=G-8331NMD8L3"
        async
      />
      <Script
        id="ga4"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8331NMD8L3');
          `,
        }}
      />
      <title>Jonathan Elmgren</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Jonathan Elmgren's Portfolio" />
    </>
  );
}
