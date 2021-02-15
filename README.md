This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, add environment variables by adding .env.local file to the root folder:

```bash
# .env.local

ZOOM_API_KEY=xxxx # replace xxxx by your zoom api key

ZOOM_API_SECRET=xxxx # replace xxxx by your zoom api secret

ZOOM_USER_ID=xxxx # replace xxxx  by your zoom account email

```

Install dependencies:

```bash
yarn install
```

Run dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

- [ ] Add type checking using typescript
- [ ] Add tests using react testing library
- [ ] Add prettier & eslint config
- [ ] Handle CSS using tailwind
- [ ] Mobile support
- [ ] Freeze node version & add nvm config
- [ ] Use i18n lib for handling multi languages
- [ ] Build a design system & UI lib using Storybook
