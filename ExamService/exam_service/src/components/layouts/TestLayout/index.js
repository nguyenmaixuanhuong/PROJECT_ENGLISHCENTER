import AppBar from './appbar';

export default function TestLayout({ children }) {
    return (
        <>
            <AppBar />
            {children}
        </>
    )
}