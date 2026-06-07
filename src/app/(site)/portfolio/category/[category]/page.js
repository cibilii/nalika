import { prisma } from '@/lib/prisma';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const items = await prisma.portfolio.findMany({
    where: { category: decodedCategory },
    orderBy: { id: 'desc' },
  });

  if (items.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">نمونه کارهای دسته {decodedCategory}</h1>
        <Link href="/">
          <Button variant="ghost">بازگشت به صفحه اصلی</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <Card key={item.id} className="overflow-hidden p-0">
            <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-zinc-400">{item.category}</p>
              {item.description && <p className="text-xs text-zinc-500 mt-2">{item.description}</p>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}