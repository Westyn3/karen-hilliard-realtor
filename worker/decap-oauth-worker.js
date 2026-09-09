/**
 * Decap CMS ⇄ GitHub OAuth proxy — deploy as a Cloudflare Worker.
 *
 * Secrets required (Worker → Settings → Variables and Secrets):
 *   GITHUB_CLIENT_ID      – from the GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  – from the GitHub OAuth App
 *
 * The GitHub OAuth App's "Authorization callback URL" must be:
 *   https://<your-worker>.workers.dev/callback
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const authUrl = new URL("https://github.com/login/oauth/authorize");
      authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", url.origin + "/callback");
      authUrl.searchParams.set("scope", "repo,user");
      authUrl.searchParams.set("state", crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const r = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "decap-oauth-worker",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await r.json();
      const payload = data.error
        ? "authorization:github:error:" + JSON.stringify(data)
        : "authorization:github:success:" +
          JSON.stringify({ token: data.access_token, provider: "github" });

      const html = [
        "<!doctype html><html><body><script>",
        "(function () {",
        "  window.addEventListener('message', function (e) {",
        "    window.opener.postMessage(" + JSON.stringify(payload) + ", e.origin);",
        "    window.close();",
        "  }, false);",
        "  window.opener.postMessage('authorizing:github', '*');",
        "})();",
        "</scr" + "ipt>Authorizing…</body></html>",
      ].join("\n");
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    return new Response("Decap OAuth proxy OK. Endpoints: /auth, /callback");
  },
};
