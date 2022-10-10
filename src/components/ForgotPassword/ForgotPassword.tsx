import React, { FC, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField, BaseTextFieldProps, Typography, Box, Button } from '@mui/material';
import { REGREX } from '../../utils/regrex';

export interface IForgotPasswordProps {
    type: 'mobile' | 'email';
    isCode?: boolean;
    fieldConfig?: IFeild;
    buttonConfig?: any;
    loader?: boolean;
    onSubmitData: (data: any) => any;
    redirectToSignIn: () => void | undefined;
}

interface IFeild extends BaseTextFieldProps {}

interface IFormInputs {
    phone?: string;
    email?: string;
    code?: string;
}

const schema = yup.object({
    isEmail: yup.boolean().nullable(),
    isCode: yup.boolean().nullable(),
    code: yup
        .string()
        .when('isCode', {
            is: true,
            then: yup.string().required('Required')
        })
        .nullable(),
    email: yup
        .string()
        .when('isEmail', {
            is: true,
            then: yup.string().required('Required').email('Enter valid email id')
        })
        .nullable(),
    phone: yup.string().when('isEmail', {
        is: false,
        then: yup.string().required('Required').matches(REGREX.phone, 'Enter valid phone number')
    })
});

const ForgotPasswordComponent: FC<IForgotPasswordProps> = (props): JSX.Element => {
    const { onSubmitData, type, isCode = false, loader, redirectToSignIn, buttonConfig } = props;
    const fromRef: any = useRef(null);

    useEffect(() => {
        if (type === 'email') {
            fromRef.current?.setFieldValue('isEmail', true);
        } else {
            fromRef.current?.setFieldValue('isEmail', false);
        }
        if (isCode === true) {
            fromRef.current?.setFieldValue('isCode', true);
        } else {
            fromRef.current?.setFieldValue('isCode', false);
        }
    }, [type, isCode]);

    const onSubmitHandler = (values: IFormInputs, actions: any) => {
        onSubmitData(values);
    };

    return (
        <Box>
            <Box sx={{ marginBottom: '3rem', textAlign: 'center' }}>
                <Typography
                    sx={{
                        color: '#63626B',
                        fontSize: '1.6rem',
                        fontWeight: 'bold',
                        marginBottom: '.2rem'
                    }}
                >
                    Forgot password
                </Typography>
                <Typography sx={{ color: '#7B7887', fontSize: '.9rem' }}>
                    {type === 'mobile' ? 'Enter your registeration mobile no. on which OTP will be send' : 'Enter your registeration email id on which mail will be send'}
                </Typography>
            </Box>
            <Formik validationSchema={schema} initialValues={{ phone: '', email: '', code: '' }} onSubmit={onSubmitHandler} innerRef={fromRef}>
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            {type === 'email' && (
                                <Grid item xs={12} lg={12} pb={4}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Enter email id*"
                                        variant="outlined"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!errors.email && touched.email}
                                        helperText={touched.email && errors.email}
                                        value={values.email}
                                    />
                                </Grid>
                            )}
                            {type === 'mobile' && (
                                <Grid item xs={12} lg={12} pb={4}>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        label="Enter mobile no*"
                                        variant="outlined"
                                        name="phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!errors.phone && touched.phone}
                                        helperText={touched.phone && errors.phone}
                                        value={values.phone}
                                    />
                                </Grid>
                            )}
                            {!!isCode && (
                                <Grid item xs={12} lg={12} pb={6}>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        label="Enter employee code*"
                                        variant="outlined"
                                        name="code"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!errors.code && touched.code}
                                        helperText={touched.code && errors.code}
                                        value={values.code}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <LoadingButton
                                    type="submit"
                                    sx={{
                                        height: '50px',
                                        textTransform: 'unset',
                                        boxShadow: 'none'
                                    }}
                                    disabled={!isValid || loader}
                                    loading={loader}
                                    fullWidth
                                    variant="contained"
                                    {...buttonConfig}
                                >
                                    <Typography sx={{ fontSize: '1rem' }}>{type === 'mobile' ? 'Request OTP' : 'Forgot password'}</Typography>
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        color: '#686868',
                                        fontSize: '.9rem',
                                        textAlign: 'center',
                                        marginTop: '3rem'
                                    }}
                                >
                                    Know your password?{' '}
                                    <Button onClick={() => redirectToSignIn()}>
                                        <Typography
                                            sx={{
                                                color: '#2477DB',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            Please Sign in
                                        </Typography>
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export const ForgotPassword = ForgotPasswordComponent;
