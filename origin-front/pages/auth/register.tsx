import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Chip, Grid, Link, TextField } from "@mui/material";

import { ErrorOutline } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";

import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { useForm } from "react-hook-form";

import { validations } from "../../utils";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { checkToken, startRegister } from "../../store/auth";
import { Loader } from "../../components";
import { startGetAction } from "../../store/actions/thunks";

type FormData = {
  email: string;
  password: string;
  name: string;
};

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isSaving, status } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    const authCheck = async () => {
      if (status === "not-authenticated") {
        // Verifico en caso de existir su token en el storage
        // y en caso de estar almacenado su token, obtengo el usuario devolviendo un true
        const ok = await dispatch(checkToken());
        if (!ok) {
          return;
        }
      }
      // Si llegue hasta aca y existe un usuario logeado, obtengo sus acciones y las guardo en el storage
      await dispatch(startGetAction());
      router.replace("/");
      return;
    };
    authCheck();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await dispatch(
      startRegister({ name, email, password })
    );

    if (!isValidLogin) {
      setShowError(true);
      return;
    }
    router.replace("/auth/login");
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

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Grid item xs={12}>
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
              id="name"
              type="text"
              label="Nombre"
              variant="outlined"
              color="primary"
              {...register("name", {
                required: "Este campo es requerido...",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
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
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
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
              loading={isSaving}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              variant="contained"
            >
              <span>Registrarse</span>
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }} display="flex" justifyContent="end">
            <Link href="/auth/login">¿Ya tienes cuenta?</Link>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ display: isSaving ? "block" : "none" }}>
        <Loader />
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
