import { useState } from "react";
import { createAuthUserWithEmailPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.style.scss";
import "../button/button.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email : '',
    password : '',
    confirmPassword : ''

}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName , email , password , confirmPassword} = formFields;



    const resetFields = () => {
        setFormFields(defaultFormFields);  
    }

    const handleChange = (event) => {

        const {name , value} = event.target;
        setFormFields({...formFields,[name]:value});

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
          alert("password doesn't match");
          return;
        }

        try {
            const {user} = await createAuthUserWithEmailPassword(email,password);

            user.displayName = displayName;
            await createUserDocumentFromAuth(user);
            resetFields();

        } catch(err) {
            if(err.code === "auth/email-already-in-use"){
                alert("Cannot create user, email already exists");
            } else {
              console.log("user creation encountered an error", err);
            }

        }
        
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={(event)=> {handleSubmit(event)}}>

                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />


                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />


                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />


                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;