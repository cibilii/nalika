import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!file) {
      return NextResponse.json({ error: 'فایلی ارسال نشده' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const uploadDir = join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });
    const path = join(uploadDir, uniqueName);
    await writeFile(path, buffer);

    const imageUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'خطا در آپلود' }, { status: 500 });
  }
}