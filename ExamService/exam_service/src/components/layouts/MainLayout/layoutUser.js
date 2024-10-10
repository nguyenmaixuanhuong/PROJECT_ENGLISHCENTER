import AppBarUser from './appbarUser';
export default function LayoutUser({ children }) {
    return (
        <>
            <AppBarUser />
            {children}
        </>
    )
}