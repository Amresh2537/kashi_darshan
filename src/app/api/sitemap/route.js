import { generateSitemap } from '@/lib/sitemap-generator';

export async function GET() {
  try {
    const success = await generateSitemap();
    
    if (success) {
      return Response.json(
        { success: true, message: 'Sitemap generated successfully' },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, error: 'Failed to generate sitemap' },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}