import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import useBookingStore from '@/store/useBookingStore';

export default function RelatedPortfolio() {
  const { selectedService } = useBookingStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!selectedService) return;
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        // فیلتر بر اساس serviceId یا category
        const filtered = data.filter(item =>
          item.serviceId === selectedService.id || item.category === selectedService.category
        );
        setItems(filtered);
      });
  }, [selectedService]);

  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">نمونه کارهای مرتبط با {selectedService?.name}</h3>
      <div className="flex overflow-x-auto gap-3 pb-2">
        {items.map(item => (
          <Card key={item.id} className="w-40 shrink-0 p-2">
            <img src={item.imageUrl} className="w-full h-28 object-cover rounded-xl" />
            <p className="text-xs text-center mt-1">{item.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}