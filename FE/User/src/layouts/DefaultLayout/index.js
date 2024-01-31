import Header from "../ComponentsLayout/Header/Header.js";
import Footer from "../ComponentsLayout/Footer/Footer.js";

function DefaultLayout({children}) {
    return (
        <div>
            <Header></Header>
            <div className="container">
                {children}
            </div>
            <Footer></Footer>
        </div>
    )
}
export default DefaultLayout;