import { useQuery } from '@tanstack/react-query';
import { GetCommentsQuery, GetCommentsQueryProps } from '../apis/getCommentsQuery';
import { GetCommentsKeys } from '../apis/getCommentsKeys';

export type GetCommentsHookProps = GetCommentsQueryProps;

export const useGetCommentsQuery = (
    props: GetCommentsHookProps,
) => {
    return useQuery({
        queryKey: GetCommentsKeys.GetComments(props),
        queryFn: GetCommentsQuery.GetComments,
    });
};