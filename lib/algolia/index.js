// Algolia search
import algoliasearch from "algoliasearch";

// Config
export const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  "eed7e5f4397996154efb293d3b44a906"
);
export const algoliaSearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY
);
