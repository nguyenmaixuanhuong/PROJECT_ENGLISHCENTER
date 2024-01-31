import Header from "../ComponentsLayout/Header/Header.jsx";
import Nav from "../ComponentsLayout/Nav/Nav.jsx";
import Grid from '@mui/material/Grid';
function DefaultLayout({ children }) {
    return (
      <div>
            <Header></Header>
            <Grid container>
                <Grid item  md={2}>
                    <Nav></Nav>
                </Grid>
                <Grid item md={10} xs={12} >
                    <div className="container bg-light ">
                        {children}
                    </div>
                </Grid>
            </Grid>
      </div>

        

    )
}
export default DefaultLayout;