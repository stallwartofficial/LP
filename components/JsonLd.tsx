// Single place structured data reaches the DOM. Accepts one schema object or
// several, multiple @graph entries on one page are valid and expected
// (e.g. an Article plus its FAQPage plus its breadcrumbs).
export function JsonLd({ schema }: { schema: object | object[] }) {
  // Escape `<` so no string value can close the script element early
  // (e.g. a stray "</script>"). Defense-in-depth: all data here is author
  // controlled, but this keeps the sink safe regardless.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
