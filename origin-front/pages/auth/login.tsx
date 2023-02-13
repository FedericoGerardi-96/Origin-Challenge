import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Chip, Grid, Link, TextField, Typography } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { ErrorOutline } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";

import { validations } from "../../utils";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { startLogin } from "../../store/auth";
import { Loader } from "@/components";

type FormData = {
  email: string;
  password: string;
};

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const LoginPage = () => {
  const { status } = useAppSelector((state: any) => state.auth);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await dispatch(startLogin({ email, password }));
    if (!isValidLogin) {
      setShowError(true);
      return;
    }
    setShowError(false);
    router.replace("/");
  };

  const [values, setValues] = useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  useEffect(() => {
    console.log(status === "checking");
  }, [status === "checking"]);

  return (
    <AuthLayout title={"Login"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Grid item xs={12} sx={{ marginBottom: 4, marginTop: 2 }}>
          <Chip
            label="No reconocemos ese usuario / contraseña"
            color="error"
            icon={<ErrorOutline />}
            className="fadeIn"
            sx={{ display: showError ? "flex" : "none" }}
          />
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              color="primary"
              {...register("email", {
                required: "Este campo es requerido...",
                validate: validations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="password"
              type={`${values.showPassword ? "text" : "password"}`}
              label="Password"
              variant="outlined"
              color="primary"
              {...register("password", {
                required: "Este campo es requerido...",
                minLength: { value: 6, message: "Minimo 6 caracteres" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <LoadingButton
              size="large"
              color="secondary"
              type="submit"
              fullWidth
              loading={status === "checking"}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              variant="contained"
            >
              <span>Ingresar</span>
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }} display="flex" justifyContent="end">
            <Link href="/auth/register">¿No tienes cuenta?</Link>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ display: status === "checking" ? "block" : "none" }}>
        <Loader />
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
