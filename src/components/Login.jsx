import { Container, Input, Button } from './index'
import { useNavigate, Link } from 'react-router-dom'
import { login as storeLogin } from '../store/userSlice'
import auth from '../services/auth';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const handleLogin = async (data) => {
        try {
            setError("");
            let resp = await auth.login(data);
            if (resp) {
                storeLogin(resp);
                navigate("/");
            } else {
                setError(resp.message);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <Container>
                <h1 className="text-3xl font-bold mb-5">Login</h1>
                <div className='flex justify-end'>
                    <Link to="/signup"><p className="text-blue-500">Don't have an account?</p></Link>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Input label="Email" type="email" placeholder="Enter your email" {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || 'Invalid email address'
                        }
                    })} />
                    <Input label="Password" type="password" placeholder="Enter your password" {...register("password", { required: true })} />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full p-4 text-white bg-black flex justify-center my-5">Login</Button>
                </form>
            </Container>
        </>
    )
}