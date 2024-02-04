import useAuthCheck from '../context/useAuthCheck';
function HomePage() {
    useAuthCheck();
    return (
        <div className="">
            <h1>Day la trang chu</h1>
            
        </div>
    )
}

export default HomePage;