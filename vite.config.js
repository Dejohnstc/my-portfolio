/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Runs the /api functions (e.g. /api/reviews) during `npm run dev`,
// using the values in your .env file. On Vercel they run as serverless functions.
function localApi() {
  return {
    name: 'local-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      for (const k of ['MONGODB_URI', 'MONGODB_DB', 'ADMIN_KEY', 'GMAIL_USER', 'GMAIL_APP_PASSWORD', 'NOTIFY_EMAIL', 'SITE_URL']) {
        if (env[k] && !process.env[k]) process.env[k] = env[k]
      }

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        const match = url.pathname.match(/^\/api\/([\w-]+)\/?$/)
        if (!match) return next()

        try {
          let raw = ''
          for await (const chunk of req) raw += chunk
          req.query = Object.fromEntries(url.searchParams)
          req.body = raw ? JSON.parse(raw) : undefined
          res.status = (code) => ((res.statusCode = code), res)
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          }

          const mod = await server.ssrLoadModule(`/api/${match[1]}.js`)
          await mod.default(req, res)
        } catch (err) {
          console.error(`[api/${match[1]}]`, err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
})
