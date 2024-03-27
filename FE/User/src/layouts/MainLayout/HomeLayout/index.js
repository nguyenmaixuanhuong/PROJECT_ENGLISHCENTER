import HomeHeader from "../../MainLayout/Components/Header/Header.jsx";
import Footer from "../../MainLayout/Components/Footer/Footer.jsx";

function HomeLayout({children}) {
    return (
        <div>
            <HomeHeader></HomeHeader>
            
                {children}
            
            <Footer></Footer>
        </div>
    )
}
export default HomeLayout;