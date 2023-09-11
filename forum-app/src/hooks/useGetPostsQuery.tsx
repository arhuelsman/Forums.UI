import { useQuery } from '@tanstack/react-query';
import { GetPostsQuery, GetPostsQueryProps } from '../apis/getPostsQuery';
import { GetPostsKeys } from '../apis/getPostsKeys';

export type GetPostsHookProps = GetPostsQueryProps;

export const useGetPostsQuery = (
    props: GetPostsHookProps,
) => {
    return useQuery({
        queryKey: GetPostsKeys.GetPosts(props),
        queryFn: GetPostsQuery.GetPosts,
    });
};