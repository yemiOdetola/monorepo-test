export default async function CasinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
