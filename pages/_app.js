import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import "../assets/antd-custom.less";
import store from "../store/store";
import Message from "../Components/MessageComponent/Message";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Message />
      <Component {...pageProps} />
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
