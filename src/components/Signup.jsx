import auth from '../services/auth'
import { useForm } from 'react-hook-form'
import { login as storeLogin } from '../store/userSlice'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Container, Input, Loading } from './index'
import { useState } from 'react'

export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const handleSignUp = async (data) => {
        try {
            setError("");
            setLoading(true);
            let resp = await auth.register(data);
            console.log(resp)
            if (resp) {
                storeLogin(resp);
                navigate("/home");
            } else {
                setError(resp.message);
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
        }
    }



    return loading ? <Loading /> : (
        <>
            <Container>
                <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
                <div className='flex justify-end'>
                    <Link to="/"><p className="text-blue-500">Already have an account?</p></Link>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <Input label="Name" type="text" placeholder="Enter your name" {...register("name", { required: true, minLength: 3, maxLength: 20 })} />
                    <Input label="Email" type="email" placeholder="Enter your email" {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || 'Invalid email address'
                        }
                    })} />
                    <Input label="Password" type="password" placeholder="Enter your password" {...register("password", {
                        required: true,
                        minLength: 6
                    })} />


                    {/* <Input label="Confirm Password" type="password" placeholder="Confirm your password" {...register("confirmPassword", {
                        required: true,
                        validate: {
                            matchPattern: (value) => value === password.current || "Passwords don't match"
                        }
                    })} /> */}
                    <p className="text-red-500 text-lg">{error}</p>
                    <Button type="submit" className='w-full p-2 text-white bg-black flex justify-center mt-3'>Sign Up</Button>
                </form>
            </Container>
        </>
    )
}