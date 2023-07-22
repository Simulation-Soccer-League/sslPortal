/** @type {import('tailwindcss').Config} */

import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'
export const mode = 'jit'
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
]
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Lato', ..._fontFamily.sans],
    },
    boxShadow: {
      myShadow1: "4.1px -5px 0 0  rgb(241 245 249)",
      myShadow2: "-4.1px -5px 0 0  rgb(241 245 249)",
    }
  },
}
export const variants = {
  extend: {},
}
export const plugins = []
