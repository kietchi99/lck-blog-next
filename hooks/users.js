// react query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Api
import { bookmark as bookmarkApi, getUser } from "../pages/api/users";

// bookmark
export function useBookmark() {
  const queryClient = useQueryClient();

  const { isLoading: isBookmarking, mutate: bookmark } = useMutation({
    mutationFn: bookmarkApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isBookmarking, bookmark };
}

// Get a user by email
export function useGetUser({ email }) {
  return useQuery({
    queryKey: ["user", email],
    queryFn: () => getUser(email),
    retry: true,
  });
}
