import { useRouter } from "next/router";
import Layout from "../layout";



const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      // const accessToken = localStorage.getItem("token");
      // const role = localStorage.getItem("role");
      const accessToken=true;

      if (!accessToken) {
        Router.replace("/Login");
        return null;
      }

      if (
        Router.pathname == "/Login" ||
        Router.pathname == "/ForgotPassword" ||
        Router.pathname == "/ResetPasswordPage" ||
        Router.pathname == "/"
      ) {
        return <WrappedComponent {...props} />;
      } else {
        return (
          <Layout>
            <WrappedComponent {...props} />
          </Layout>
        );
      }
    }

    return null;
  };
};

export default withAuth;
