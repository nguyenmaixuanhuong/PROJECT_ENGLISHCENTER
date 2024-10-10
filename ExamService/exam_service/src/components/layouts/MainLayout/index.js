import AppBar from './appbar';
export default function Layout({ children }) {
    return (
        <>
            <AppBar />
            {children}
        </>
    )
}