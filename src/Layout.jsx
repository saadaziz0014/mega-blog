import { Outlet, useNavigate } from "react-router-dom";
import { Loading, Sidebar } from "./components";
import { useEffect, useState } from "react";
import auth from "./services/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/userSlice";

export default function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth.checkSession()
            .then((user) => {
                if (user) {
                    dispatch(login(user));
                } else {
                    navigate("/")
                    dispatch(logout());
                }
                setLoading(false)
            })
            .catch((error) => {
                navigate("/")
                setLoading(false)
            })
    }, [])
    if (loading) return <Loading />
    else {
        return (
            <>
                <div className="flex h-screen w-full">
                    <Sidebar />
                    <Outlet />
                </div>
            </>
        )
    }
}