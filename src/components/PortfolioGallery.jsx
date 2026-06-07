'use client';
import PortfolioFlipCard from './ui/PortfolioFlipCard';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from './ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useBookingStore from '@/store/useBookingStore';

export default function PortfolioGallery() {
  const [groupedItems, setGroupedItems] = useState({});
    const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(true);
  const { setSelectedPortfolio } = useBookingStore();
  const router = useRouter();
  useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);

  return () => window.removeEventListener("resize", check);
}, []);
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        const groups = {};
        data.forEach(item => {
          if (!groups[item.category]) groups[item.category] = [];
          groups[item.category].push(item);
        });
        setGroupedItems(groups);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleRequest = (item) => {
    setSelectedPortfolio(item);
    router.push('/book');
  };

  if (loading) return <div className="text-center py-12">در حال بارگذاری گالری...</div>;
  if (Object.keys(groupedItems).length === 0) return null;

  return (
    <div className="space-y-12">
      {Object.entries(groupedItems).map(([category, items]) => (
        <Section key={category} category={category} items={items} onRequest={handleRequest} />
      ))}
    </div>
  );
}

function Section({ category, items, onRequest }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-pink-400">{category}</h2>
        <Link href={`/portfolio/category/${encodeURIComponent(category)}`}>
          <Button variant="ghost" size="sm">دیدن همه ({items.length})</Button>
        </Link>
      </div>
      <div className="relative">
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-pink-500" style={{ scrollbarWidth: 'thin' }}>
          {items.slice(0, 10).map(item => (
            <PortfolioFlipCard
  key={item.id}
  item={item}
  onRequest={onRequest}
/>
          ))}
        </div>
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}