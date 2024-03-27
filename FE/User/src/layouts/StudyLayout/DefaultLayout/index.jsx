import { useAuthCheckLogin } from '../../../Context/auth.js';
import Header from '../Components/Header/Header.jsx'
import NavBar from '../Components/Navbar/Navbar.jsx';
import Grid from '@mui/material/Grid';
function DefaultLayoutStudy({ children }) {
    useAuthCheckLogin();
    return (
        <div>
            <Header></Header>
            <Grid container>
                <Grid item md={2.5} xs={0}>
                    <NavBar></NavBar>
                </Grid>
                <Grid item md={9.5} xs={12} >
                    {children}
                </Grid>
            </Grid>
        </div>
    );
}

export default DefaultLayoutStudy;