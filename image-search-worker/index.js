export default {
    async fetch(request, env) {
      if (request.method === 'POST' && request.url.endsWith('/upload')) {
        const formData = await request.formData();
        const image = formData.get('image');
        if (!image) {
          return new Response('No image provided', { status: 400 });
        }
  
        const key = `image-${Date.now()}-${image.name}`;
        await env.MY_BUCKET.put(key, image.stream());
        const url = `https://你的R2自訂網域/${key}`; // 後面設定 R2 後填入
        return new Response(JSON.stringify({ url }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response('Method not allowed', { status: 405 });
    }
  };