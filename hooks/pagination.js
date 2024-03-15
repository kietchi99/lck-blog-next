// React query
import { useInfiniteQuery } from "@tanstack/react-query";

// Api
import { getArticleOnPage } from "@/pages/api/articles";
import { getCommentsOnPage } from "@/pages/api/comments";
import { getSavedArticles } from "@/pages/api/users";

// Paginate
export function usePagination({ sortBy, articlesID, userID }) {
  return useInfiniteQuery({
    queryKey: ["projects", sortBy],
    queryFn: ({ pageParam }) =>
      sortBy
        ? getArticleOnPage({ sortBy, pageParam })
        : articlesID
        ? getCommentsOnPage({ articlesID, pageParam })
        : getSavedArticles({ userID, pageParam }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      return lastPage.length < 5 ? undefined : allPages.length + 1;
    },
  });
}
