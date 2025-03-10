import LoginForm from '@/components/login-form';

export default function LoginPage({ params }: { params: { market: string } }) {
  const { market } = params;

  return (
    <div>
      <h2>Login to {market === 'en' ? 'English' : 'Canadian'} Market</h2>
      <LoginForm market={market} />
    </div>
  );
}
