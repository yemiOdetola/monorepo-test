import Link from 'next/link';

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({ title, description, href }: FeatureCardProps) {
  return (
    <Link 
      href={href}
      className="group rounded-lg px-5 py-4 transition-colors hover:text-gray-400"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50 group-hover:opacity-70">
        {description}
      </p>
    </Link>
  );
} 