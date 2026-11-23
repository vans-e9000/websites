export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) return response;

    const path = url.pathname;
    const target = new URL(request.url);

    if (path.endsWith("/")) {
      // / -> /index.html
      target.pathname = path + "index.html";
    } else if (!/\.[a-z0-9]+$/i.test(path)) {
      // /about -> /about.html
      target.pathname = path + ".html";
    } else {
      return response;
    }

    return env.ASSETS.fetch(target.toString());
  },
};
