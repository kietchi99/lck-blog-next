// React toast
import toast from "react-hot-toast";

// React query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Api
import {
  getAllComments,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "../pages/api/comments";

// Get All comments
export function useAllComments({ articleID }) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => getAllComments({ articleID }),
    staleTime: 0,
  });
}

// Create Comment
export function useCreateComment() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createComment } = useMutation({
    mutationFn: createCommentApi,

    onSuccess: () => {
      toast.success("New comments successfully created");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => toast.console.error(err.message),
  });

  return { isCreating, createComment };
}

// Delete comment
export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,

    onSuccess: () => {
      toast.success("Comment successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteComment };
}
