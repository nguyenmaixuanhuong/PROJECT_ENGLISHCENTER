import AppBar from './appbar';
export default function ExamLayout({ children }) {
    return (
        <>
            <AppBar />
            {children}
        </>
    )
}