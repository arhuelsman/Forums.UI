import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostPostMutation, PostPostMutationProps } from '../apis/postPostMutation';
import { PostPostKeys } from '../apis/postPostKeys';

export type SavePostMutationProps = PostPostMutationProps;

export const usePostPostMutation = (
  props: SavePostMutationProps,
  options?: { onSuccess: () => void },
) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: PostPostKeys.PostPost(props),
    mutationFn: PostPostMutation.PostPost,
    onSuccess: () => {
      options?.onSuccess();
      queryclient.refetchQueries({
        queryKey: [{ scope: 'GetPostsApi' }],
      });
    },
  });
};
