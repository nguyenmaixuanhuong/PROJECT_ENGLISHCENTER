import Header from "../ComponentsLayout/Header/Header.jsx";
import Nav from "../ComponentsLayout/Nav/Nav.jsx";
import Grid from '@mui/material/Grid';
import './styles.scss'
function DefaultLayout({ children }) {
    return (
        <div className="container-fluit">
            <Grid container>
                <Grid item md={2} xs={0}>
                    <Nav></Nav>
                </Grid>
                <Grid item md={10} xs={12} >
                    <Header></Header>
                    <div className="container parent_container">
                        {children}
                    </div>
                </Grid>
            </Grid>
        </div>



    )
}
export default DefaultLayout;