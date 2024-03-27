import HeaderDefault from "../Components/Header/Header_Default.jsx";
import Footer from "../Components/Footer/Footer.jsx";

function DefaultLayout({children}) {
    return (
        <div>
            <HeaderDefault></HeaderDefault>
            
                {children}
            
            <Footer></Footer>
        </div>
    )
}
export default DefaultLayout;