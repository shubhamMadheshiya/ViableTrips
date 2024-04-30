import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApi";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import Loading from '../../assets/Loading'

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (!effectRan.current) {
      // Avoid double execution in React 18 Strict Mode
      effectRan.current = true;

      const verifyRefreshToken = async () => {
        try {
          const response = await refresh();
          console.log(response);
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, persist, refresh]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <Loading/>;
  } else if (isError) {
    content = (
        <Outlet/>
    //   <p className="errmsg">
    //     {error.data?.message}
    //     <Link to="/login">Please login again</Link>.
    //   </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && !isLoading) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
