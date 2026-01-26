import { Authenticated, Unauthenticated, AuthLoading} from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";


import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LoginForm from "../../components/Auth/LoginForm.tsx";
import CompleteProfile from "../../components/Auth/CompleteProfile.tsx";



const LoginPage = () => {
const {signOut} = useAuthActions();
const user = useQuery(api.functions.users.getCurrentUser);


    return(

        <>
            <AuthLoading children={undefined}>{}</AuthLoading>

            <Unauthenticated>
                {/*<SignUpForm/>*/}
                <LoginForm/>
            </Unauthenticated>

            <Authenticated>
                <AuthenticatedContent user={user} signOut={signOut} />
            </Authenticated>
        </>
    )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AuthenticatedContent = ({ user, signOut }) => {
    const navigate = useNavigate();

    // 🚀 Redirect once user loads but user.status is missing
    useEffect(() => {
        // If user exists AND user.status exists → redirect to "/"
        if (user && user.status) {
            navigate("/", { replace: true });
        }
    }, [user]);


    return (
        <CompleteProfile user={user} signOut={signOut}></CompleteProfile>
    );
};

export default LoginPage;