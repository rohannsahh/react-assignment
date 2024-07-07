import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography ,CssBaseline ,Box} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {  styled } from '@mui/material/styles';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('isValid', 'Phone number is not valid', value => isValidPhoneNumber(value || '')),
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

const PhoneInputWrapper = styled('div')(({ theme }) => ({
  '.PhoneInputInput': {
    width: '100%',
    padding: '18.5px 14px',
    fontSize: '16px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  '.PhoneInput': {
    display: 'flex',
    alignItems: 'center',
  },
}));

const UserForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('userDetails', JSON.stringify(values));
      navigate('/second-page');
    },
  });



  return (
      <Container>
            <CssBaseline />
            <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding={2}
      >
        <Typography variant="h4" gutterBottom>User Form</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <PhoneInputWrapper>
            <PhoneInput
              defaultCountry="IN"
              value={formik.values.phone}
              onChange={(phone) => formik.setFieldValue('phone', phone)}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Typography color="error" variant="body2">{formik.errors.phone}</Typography>
            )}
          </PhoneInputWrapper>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
        </Box>
      </Container>
  );
};

export default UserForm;
