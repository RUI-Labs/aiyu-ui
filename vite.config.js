import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['aiyu.png','aiyu-192.png','aiyu-512.png'],
      manifest: {
        name: 'Aiyu',
        short_name: 'Aiyu',
        description: 'Smooth like jelly ',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'aiyu-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'aiyu-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        share_target: {
          action: "/share",
          method: "POST",
          enctype: "multipart/form-data",
          params: {
            files: [
              {
                name: "images",
                accept: ["image/*"],
              },
            ],
          },
        },
      },
      workbox: {
        importScripts: ["sw-next-message.js"],
        runtimeCaching: [
          {
            handler: ({ event }) => {
              const dataPromise = event.request.formData();
              event.waitUntil(
                (async function () {
                  // defined in sw-next-message.js
                  await nextMessage("share-ready");
                  const client = await self.clients.get(
                    event.resultingClientId
                  );

                  const formData = await dataPromise;
                  client.postMessage({
                    images: formData.getAll("images") || [],
                    uri: "/share",
                  });
                })()
              );
              return Response.redirect("/share");
            },
            urlPattern: "/share",
            method: "POST",
          },
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
