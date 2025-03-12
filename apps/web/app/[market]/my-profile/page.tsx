export default function MyProfilePage({ params }: { params: { market: string } }) {
  const { market } = params;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Profile for {market === 'en' ? 'English' : 'Canadian'} Market</p>
    </div>
  );
}
