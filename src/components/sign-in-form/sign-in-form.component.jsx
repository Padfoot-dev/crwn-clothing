import { signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";


const defaultFormFields = {
    email : '',
    password : ''

}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email , password } = formFields;


    const resetFields = () => {
        setFormFields(defaultFormFields);  
    }

    const handleChange = (event) => {

        const {name , value} = event.target;
        setFormFields({...formFields,[name]:value});

    }



    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);

    }

    const handleSubmit = async (event)=> {
        event.preventDefault();
        try {
        const {user} = await signInAuthUserWithEmailPassword(email,password);
        resetFields();
        } catch(error) {
            if(error.code === "auth/wrong-password") {
                alert("Invalid password");
            } else if(error.code === "auth/user-not-found") {
                alert("User not found")
            } else {
                console.log(error);
            }
            
        }
    }

    return(
        <div className="sign-up-container">

            <h2>I already have an account</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={(event)=> handleSubmit(event)} >
            
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />


                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                <Button type="Submit">Sign In</Button>
                <Button type="button" onClick={signInWithGoogle} buttonType={"google"} > Google sign in</Button>
                </div>

            </form>
            

        </div>
    )
}


export default SignIn;