// Single place structured data reaches the DOM. Accepts one schema object or
// several, multiple @graph entries on one page are valid and expected
// (e.g. an Article plus its FAQPage plus its breadcrumbs).
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
