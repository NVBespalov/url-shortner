
import { IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../shared/hooks";
import {deleteUrlThunk, selectUrls} from "../entities/url/model";

export const UrlsList = () => {
    const urls = useAppSelector(selectUrls);
    const dispatch = useAppDispatch();

    if (!urls.length) return null;

    return (
        <Paper elevation={1}>
            <List>
                {urls.map((url) => (
                    <ListItem key={url.id}>
                        <ListItemText
                            primary={url.shortUrl}
                            secondary={url.originalUrl}
                        />
                        <ListItem secondaryAction>
                            <IconButton edge="end" color="error" onClick={() => dispatch(deleteUrlThunk(url.id))}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};