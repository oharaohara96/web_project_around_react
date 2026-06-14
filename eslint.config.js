import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react' // 🌟 Importamos o plugin do React
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    // 🌟 Adicionamos o plugin do React para ele reconhecer as regras de propriedades
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // 🌟 Criamos a seção rules aqui embaixo com a regra que o exercício pediu:
    rules: {
      "react/prop-types": "off",
    },
  },
])