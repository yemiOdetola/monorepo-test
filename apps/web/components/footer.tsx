'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {year} Testing Casino. No rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 