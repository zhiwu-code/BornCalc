import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
      base: '/BornCalc/',
      plugins: [
              react(),
              VitePWA({
                        registerType: 'autoUpdate',
                        includeAssets: ['apple-touch-icon.png', 'born-logo-black.png', 'born-logo-white.png', 'born-icon-black.png', 'born-icon-white.png'],
                        manifest: {
                                    name: 'Børn Calculator',
                                    short_name: 'Børn Calc',
                                    description: 'Quick retail math: margins, markups, and pricing',
                                    theme_color: '#f5f0eb',
                                    background_color: '#f5f0eb',
                                    display: 'standalone',
                                    orientation: 'portrait',
                                    icons: [
                                        {
                                                        src: 'born-icon-white.png',
                                                        sizes: '192x192',
                                                        type: 'image/png',
                                        },
                                        {
                                                        src: 'born-icon-white.png',
                                                        sizes: '512x512',
                                                        type: 'image/png',
                                        },
                                        {
                                                        src: 'born-icon-white.png',
                                                        sizes: '512x512',
                                                        type: 'image/png',
                                                        purpose: 'any maskable',
                                        },
                                                ],
                        },
              }),
            ],
})
