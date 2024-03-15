//React query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//Next
import { useRouter } from "next/navigation";

//React-hot-toast
import toast from "react-hot-toast";

//Api
import {
  getAllArticles,
  createArticle as createArticleApi,
  updateArticle as updateArticleApi,
  heart as heartApi,
  getArticle,
} from "../pages/api/articles";

//Get all articles
export function useAllArticles(sort) {
  return useQuery({
    queryKey: ["articles", sort],
    queryFn: () => getAllArticles(sort),
    staleTime: 0,
  });
}

//Heart a article
export function useHeart() {
  const queryClient = useQueryClient();

  const { isLoading: isHearting, mutate: heart } = useMutation({
    mutationFn: heartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isHearting, heart };
}

// Create a article
export function useCreateArticle() {
  const router = useRouter();

  const { isLoading: isCreating, mutate: createArticle } = useMutation({
    mutationFn: createArticleApi,
    onSuccess: () => {
      router.push("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createArticle };
}

//update article
export function useUpdateArticle() {
  const router = useRouter();
  const { isLoading: isUpdating, mutate: updateArticle } = useMutation({
    mutationFn: updateArticleApi,
    onSuccess: () => {
      toast.success("Article successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateArticle };
}

// //Get a article
// export function useArticle({ id }) {
//   return useQuery({
//     queryKey: ["article"],
//     queryFn: () => getArticle({ id }),
//     staleTime: 0,
//   });
// }
