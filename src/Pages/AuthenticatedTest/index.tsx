import { useAuthenticationStore } from '../../state/store'

export default function(){
    const { user } = useAuthenticationStore();

    if(!user){
        return <h3>Not authenticated! :(</h3>
    }   

    return (
        <>
        <h3>You are authenticated! { user?.fname}</h3>
        </>
    )
}