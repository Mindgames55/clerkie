This is the Clerckie Challenge.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## The app

The app is deployed on [Vercel](https://clerkie-8ojx1vxgj-mindgames55.vercel.app/)

## Core functionality

- Show a list of first contacts using server components
- Load more contacts in an infinite scroller using client components
- User can filter the data already shown and when loading more the loaded data is already filtered according to the same criteria
- User can clear all filters which will show **all** the results, and clear the results loaded after applied the first filter (since the FE only requested for filtered data now upon clearing filters we need to request the same data without any filtering)
- If when filtering data we reach the end of the results, the infinite scroller gets tear down. Clicking clear all filters will reconnect so the user can see the totality of the data
- Added an extra indicator (not in the designs) when there is no more data to load


## Next Steps (TODOs)

- Add error handling
- Use more semantic HTML
- Handle focus on user interactions (open filter dropdown - close filter dropdown)
- Incorporate relevant metatags and manipulate the document title according to the route segment
- Incorporate state management lib or wrap in context to preserve state between the routes
- Standardize styling (incorporating a design system)
- Add unit tests and E2E testing

