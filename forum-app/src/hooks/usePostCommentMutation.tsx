import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostCommentMutation, PostCommentMutationProps } from '../apis/postCommentMutation';
import { PostCommentKeys } from '../apis/postCommentKeys';

export type SavewCommentMutationProps = PostCommentMutationProps;

export const usePostCommentMutation = (
  props: SavewCommentMutationProps,
  options?: { onSuccess: () => void },
) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: PostCommentKeys.PostComment(props),
    mutationFn: PostCommentMutation.PostComment,
    onSuccess: () => {
      options?.onSuccess();
      queryclient.refetchQueries({
        queryKey: [{ scope: 'GetCommentsApi' }],
      });
    },
  });
};
