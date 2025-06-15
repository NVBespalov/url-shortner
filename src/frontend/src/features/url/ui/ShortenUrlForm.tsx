import {useForm, Controller} from 'react-hook-form';
import {TextField, Button, Box, Paper} from '@mui/material';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from "../../../app/hooks.ts";
import {createUrlThunk} from "../model/urlThunk.ts";


const schema = yup.object().shape({
    url: yup.string().url('Некорректный URL').required('Введите ссылку'),
});

export const ShortenUrlForm = () => {
    const dispatch = useAppDispatch();
    const {control, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {url: ''},
    });

    const onSubmit = async (data: { url: string }) => {
        await dispatch(createUrlThunk(data.url));
        reset();
    };

    return (
        <Paper elevation={2} sx={{p: 3}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" gap={2}>
                    <Controller
                        name="url"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField
                                {...field}
                                label="Вставьте длинную ссылку"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                variant="outlined"
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Сократить
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};