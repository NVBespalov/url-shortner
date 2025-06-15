import {Paper, Typography, List, ListItem, Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {fetchAnalyticsThunk} from "../../model/analyticThunk";


interface LinkAnalyticsProps {
    sortCode: string;
}

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export const LinkAnalytics = ({sortCode}: LinkAnalyticsProps) => {
    const dispatch = useAppDispatch();
    const {isLoading, data: {clicks, lastVisitors}} = useAppSelector((state) => state.analytics);

    useEffect(() => {
        dispatch(fetchAnalyticsThunk(sortCode));
    }, [dispatch, sortCode]);

    if (isLoading) {
        return <Typography>Загрузка статистики...</Typography>;
    }

    return (
        <StyledPaper>
            <Typography variant="h6" gutterBottom>
                Статистика
            </Typography>
            <Box mb={2}>
                <Typography>
                    Всего переходов: <strong>{clicks}</strong>
                </Typography>
            </Box>
            {lastVisitors.length > 0 && (
                <>
                    <Typography variant="subtitle2" gutterBottom>
                        Последние уникальные посетители:
                    </Typography>
                    <List dense>
                        {lastVisitors.map((ip: string) => (
                            <ListItem key={ip}>
                                <Typography variant="body2">{ip}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </StyledPaper>
    );
};