import { useAuthenticationStore, useUserStore } from '../../state/store'
// import { useQuery } from '@tanstack/react-query';

export default function(){
    const { user } = useAuthenticationStore();
    // const { users, getAllUsers } = useUserStore();

    // useQuery({
    //     queryKey: ['users'],
    //     queryFn: getAllUsers,
    //   });

    if(!user){
        return <h3>Not authenticated! :(</h3>
    }   

    return (
        <>
        <h3>You are authenticated! { user?.fname}</h3>
        </>
    )
}