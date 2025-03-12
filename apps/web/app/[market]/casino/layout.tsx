export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { market: string };
}) {
  const { market } = await params;

  return (
    <div className={`market-${market}`}>
      <header>
        <h1>{market === 'en' ? 'English Market' : 'Canadian Market'}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
