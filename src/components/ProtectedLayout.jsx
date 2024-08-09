import { useSelector } from 'react-redux';
import { Loading } from './index'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ProtectedLayout({ children, authStatus = true, forSignup = false }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const authStore = useSelector((state) => state.login);
    useEffect(() => {
        if (authStatus == true && authStore != authStatus && forSignup == false) {
            navigate('/');
        } else if (authStatus == true && authStore == authStatus) {
            navigate('/home');
        } else if (forSignup == true) {
            //do nothing
        } else {
            navigate('/');
        }
        setLoading(false);
    }, [navigate, authStatus, authStore])
    return loading ? <Loading /> : <>{children}</>;
}