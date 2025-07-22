This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To run storybook:
```bash
npm run storybook
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tech Stack Used
1. Next Js with Typescript
2. Chakra UI for designing
3. Integrate storybooks for components preview


## Development steps (For project infrastructure)
1. Create a next project 
2. Add Chakra UI `npm i @chakra-ui/react @emotion/react`
3. Add snippets to build UI faster `npx @chakra-ui/cli snippet add`
4. Update tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```
5. Creates `_app.tsx` file in `pages` directory and fire in the following code in it
```js
import { Provider } from "@/components/ui/provider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
```
6. To `suppressHydrationWarning` created `_document.tsx` and include the following code in `pages` directory
```js
import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```
7. Add the following configuration in `next.config.ts` file to optimize bundle
```js
 experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
```

8. Add Storybook for components preview 

```shell
npm i @storybook/addon-themes @chakra-ui/react @emotion/react
npm create storybook@latest
```
For Details:
`https://storybook.js.org/docs/get-started/frameworks/nextjs`
`https://next.chakra-ui.com/docs/get-started/frameworks/storybook`

9. Edit the .storybook/preview.ts file to include the Chakra UI provider.
```js
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Preview } from '@storybook/nextjs'
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
   decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
```
## 🐾 User Guide
Visit the live app here 👉 https://dogs-ui.vercel.app/

As a user, you can:

✅ View the list of dog breeds and their sub-breeds — no login required

🔐 Log in to manage dog breeds:

➕ Add a new dog breed (with optional sub-breeds)

📝 Rename a sub-breed to and existing dog breed

❌ Delete a dog breed or sub-breed

🧪 Demo Login
Use this demo account to access the full functionality:

Username: test@gmail.com  
Password: abcdef
