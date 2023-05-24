import 'pixi.js'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from 'src/App'
import { PixcelProvider } from 'src/PixcelProvider'

import 'focus-visible/dist/focus-visible'
import 'src/events/menu-actions'
import 'src/events/toolbar-actions'

const root = document.getElementById('root')!

const view = (
  <React.StrictMode>
    <PixcelProvider>
      <App />
    </PixcelProvider>
  </React.StrictMode>
)

createRoot(root).render(view)
