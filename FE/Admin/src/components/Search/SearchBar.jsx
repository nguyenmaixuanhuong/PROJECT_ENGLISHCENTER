import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const SearchBar = ({ setSearchQuery }) => (
    <Box sx={{ display: 'flex', width: '100%', mb: 2, px: 10, justifyContent: 'space-around' }}>
        <TextField
            fullWidth
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            label="Nhập từ khóa tìm kiếm..."
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton>

    </Box>
);

export default SearchBar;