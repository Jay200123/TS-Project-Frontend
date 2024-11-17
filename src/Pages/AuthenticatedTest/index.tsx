import { useAuthenticationStore, useUserStore } from '../../state/store'
import { useEffect } from 'react';

export default function(){
    const { user } = useAuthenticationStore();
    // const { users, getAllUsers } = useUserStore();  
    
    // useEffect(() => {
    //     getAllUsers();
    // }, [getAllUsers]);

    // console.log(users);

    if(!user){
        return <h3>Not authenticated! :(</h3>
    }   

    return (
        <>
        <h3>You are authenticated! { user?.fname}</h3>
        </>
    )
}