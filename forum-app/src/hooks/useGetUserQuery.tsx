import { useQuery } from '@tanstack/react-query';
import { GetUserQuery, GetUserQueryProps } from '../apis/getUserQuery';
import { GetUserKeys } from '../apis/getUserKeys';

export type GetUserHookProps = GetUserQueryProps;

export const useGetUserQuery = (
    props: GetUserHookProps,
) => {
    return useQuery({
        queryKey: GetUserKeys.GetUser(props),
        queryFn: GetUserQuery.GetUser,
    });
};