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
        const url = `${new URL(request.url).origin}/public/${key}`;
        return new Response(JSON.stringify({ url }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (request.url.endsWith('/public/')) {
        const key = new URL(request.url).pathname.split('/').pop();
        const object = await env.MY_BUCKET.get(key);
        if (!object) {
          return new Response('File not found', { status: 404 });
        }
        return new Response(object.body, {
          headers: { 'Content-Type': object.httpMetadata.contentType || 'application/octet-stream' }
        });
      }
      return new Response('Method not allowed', { status: 405 });
    }
  };