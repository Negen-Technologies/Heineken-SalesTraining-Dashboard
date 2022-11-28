import { useRouter } from "next/router";
import Layout from "../layout";
import {
  adminmenu
} from "../layout/menuLinks";


const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = localStorage.getItem("token");
       if (adminmenu.some((e) => e.link == Router.pathname)) {
         var i = adminmenu.findIndex((element) => {
           return element.link === Router.pathname;
         });
         localStorage.setItem("selectedKey", i.toString());
       }

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
