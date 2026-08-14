import { Suspense } from 'react';
import SearchContent from './SearchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto p-6 text-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
