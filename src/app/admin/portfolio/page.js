'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'sonner';
import { Trash2, Upload, Edit2, X } from 'lucide-react';

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error('خطا در دریافت گالری');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch {
      toast.error('خطا در دریافت سرویس‌ها');
    }
  };

  useEffect(() => {
    fetchPortfolio();
    fetchServices();
  }, []);

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setSelectedServiceId('');
    setImageFile(null);
    setEditingId(null);
    setExistingImageUrl('');
    const input = document.getElementById('imageInput');
    if (input) input.value = '';
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description || '');
    setSelectedServiceId(item.serviceId?.toString() || '');
    setExistingImageUrl(item.imageUrl);
    setImageFile(null);
    const input = document.getElementById('imageInput');
    if (input) input.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!title) { toast.error('عنوان الزامی است'); return; }
    if (!category) { toast.error('دسته‌بندی الزامی است'); return; }
    if (!editingId && !imageFile) { toast.error('تصویر الزامی است'); return; }
    setUploading(true);
    try {
      let imageUrl = existingImageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('خطا در آپلود');
        const { imageUrl: newUrl } = await uploadRes.json();
        imageUrl = newUrl;
      }
      const payload = { title, imageUrl, category, description, serviceId: selectedServiceId || null };
      const url = editingId ? `/api/admin/portfolio/${editingId}` : '/api/admin/portfolio';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        let errMsg = 'خطا در ذخیره';
        try { const errData = await res.json(); errMsg = errData.error || errMsg; } catch { errMsg = await res.text(); }
        throw new Error(errMsg);
      }
      toast.success(editingId ? 'ویرایش شد' : 'افزوده شد');
      resetForm();
      fetchPortfolio();
    } catch (err) { toast.error(err.message); } finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این آیتم اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('حذف شد');
      fetchPortfolio();
      if (editingId === id) resetForm();
    } catch { toast.error('خطا در حذف'); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">مدیریت گالری نمونه کارها</h1>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editingId ? 'ویرایش نمونه کار' : 'افزودن نمونه کار جدید'}</h2>
          {editingId && <button onClick={resetForm}><X className="w-5 h-5" /></button>}
        </div>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <Input label="عنوان" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div>
            <label className="text-sm text-zinc-400">دسته‌بندی</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="مثال: مانیکور, پدیکور, ..." list="categorySuggestions" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3" />
            <datalist id="categorySuggestions">
              {[...new Set(items.map(item => item.category))].map(cat => <option key={cat} value={cat} />)}
            </datalist>
          </div>
          <textarea placeholder="توضیحات (اختیاری)" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3" />
          <div>
            <label className="text-sm text-zinc-400">سرویس مرتبط (اختیاری)</label>
            <select value={selectedServiceId} onChange={(e) => setSelectedServiceId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3">
              <option value="">ندارد</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.name} - {s.price} تومان</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-400">تصویر {editingId && '(برای تغییر فایل جدید انتخاب کنید)'}</label>
            <input id="imageInput" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3" />
            {editingId && existingImageUrl && !imageFile && <p className="text-xs text-zinc-500">تصویر فعلی: {existingImageUrl.split('/').pop()}</p>}
          </div>
          <Button type="submit" disabled={uploading}><Upload className="w-4 h-4 ml-2" /> {uploading ? 'در حال ذخیره...' : (editingId ? 'ویرایش' : 'افزودن')}</Button>
        </form>
      </Card>
      {loading ? <div>در حال بارگذاری...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(item => (
            <Card key={item.id} className="relative group overflow-hidden p-0">
              <img src={item.imageUrl} className="w-full h-48 object-cover rounded-2xl" />
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.category}</p>
                {item.description && <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{item.description}</p>}
              </div>
              <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => handleEditClick(item)} className="bg-black/60 p-2 rounded-full"><Edit2 className="w-4 h-4 text-blue-400" /></button>
                <button onClick={() => handleDelete(item.id)} className="bg-black/60 p-2 rounded-full"><Trash2 className="w-4 h-4 text-rose-400" /></button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}