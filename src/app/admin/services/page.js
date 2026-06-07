"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const serviceSchema = z.object({
  name: z.string().min(2, "حداقل ۲ حرف"),
  price: z.coerce.number().min(0, "قیمت نامعتبر"),
  duration: z.coerce.number().min(5, "حداقل ۵ دقیقه"),
  category: z.string().min(1, "دسته‌بندی الزامی"),
});

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: "", price: 0, duration: 0, category: "" },
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast.error("خطا در دریافت خدمات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onSubmit = async (data) => {
    try {
      const url = editingId
        ? `/api/admin/services/${editingId}`
        : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "خطا در ذخیره");
      }
      toast.success(editingId ? "ویرایش شد" : "سرویس اضافه شد");
      reset();
      setEditingId(null);
      setIsFormOpen(false);
      fetchServices(); // بارگذاری مجدد لیست
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setValue("name", service.name);
    setValue("price", service.price);
    setValue("duration", service.duration);
    setValue("category", service.category);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف این سرویس اطمینان دارید؟")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "خطا در حذف");
      }
      toast.success("سرویس حذف شد");
      fetchServices(); // بارگذاری مجدد لیست
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مدیریت خدمات</h1>
        <Button
          onClick={() => {
            setEditingId(null);
            reset();
            setIsFormOpen(true);
          }}
        >
          <Plus className="w-4 h-4 ml-2" /> سرویس جدید
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "ویرایش" : "افزودن"} سرویس
            </h2>
            <button onClick={() => setIsFormOpen(false)} className="text-zinc-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="نام سرویس"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="قیمت (تومان)"
              type="number"
              {...register("price")}
              error={errors.price?.message}
            />
            <Input
              label="مدت (دقیقه)"
              type="number"
              {...register("duration")}
              error={errors.duration?.message}
            />
            <Input
              label="دسته‌بندی"
              {...register("category")}
              error={errors.category?.message}
            />
            <Button type="submit">ذخیره</Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-3xl p-5 animate-pulse h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{service.name}</h3>
                <p className="text-zinc-400 text-sm">
                  {service.duration} دقیقه • {service.category}
                </p>
                <p className="text-pink-400 font-bold mt-1">{service.price} تومان</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}