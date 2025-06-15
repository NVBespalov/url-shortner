import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email('Введите корректный email')
        .required('Email обязателен для заполнения'),
    password: yup
        .string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Пароль обязателен для заполнения'),
    name: yup
        .string()
        .min(3, 'Имя должно содержать минимум 3 символа')
        .required('Имя обязательно для заполнения'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
});
