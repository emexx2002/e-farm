import { useEffect } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import * as Yup from "yup";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import { AuthService } from "../../services/auth";
import { useMutation } from "react-query";
import { AuthActions } from "../../zustand/auth.store";



// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required"),
  password: Yup.string().trim().required("*Password is required"),
});

export default function Login() {
  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const router = useLocation();
  const navigate = useNavigate()


  // const [isLoading, setIsLoading] = useState(false);

  // Login detail
  const userLoginInfo = {
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object(
    {
      email: Yup.string().required(),
      password: Yup.string().required(),
      role: Yup.string().required()

    }
  )

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: ""

    },
    validationSchema,
    onSubmit: (value) => {
      console.log(value)
      submitRegister.mutate(value)
    }
  })

  const submitRegister = useMutation(
    async (values: {

      email: string,
      password: string,
      role: string

    }) => {
      const { role, ...value } = values
      return values.role === "seller" ? await AuthService.loginSeller(value) : await AuthService.loginBuyer(value)
    },
    {
      onSuccess: (response) => {
        AuthActions.setToken(response.data.data.accessToken)
        toast.success("Account created successful");
        if (response.data.data.farmer) {
          console.log(response.data.data.farmer)
          AuthActions.setRole("seller")
          AuthActions.setProfile(response.data.data.farmer)
          form.setSubmitting(false)
          requestAnimationFrame(() => {
            navigate("/products")
          });
        } else {
          AuthActions.setRole("buyer")
          form.setSubmitting(false)
          requestAnimationFrame(() => {
            navigate("/")
          });

        }
        // form.setSubmitting(false)
        // requestAnimationFrame(() => {
        //   navigate("/")
        // });

      },
      onError: (err: any) => {
        // form.setSubmitting(false)
      },
    }
  );




  return (
    <main className='h-full'>
      <div style={{ backgroundImage: "url('/signin-wavy-pattern.svg')" }} className=" bg-no-repeat bg-center h-full flex justify-center items-center">
        <div className='bg-white rounded-2xl lg:w-[560px] py-11 px-9'>
          <h2 className='text-2xl font-extrabold font-satoshi text-black mb-2'>
            Sign In
          </h2>
          <p className='text-sm mb-8 font-normal font-satoshiRegular text-grayish3'>
            Welcome back to Coal City MarketPlace, login to your account below to
          </p>
          <FormikProvider value={form}>

            <form onSubmit={form.handleSubmit} className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <TextInput
                  name='email'
                  type='email'
                  placeholder='Email address'

                />
                <select {...form.getFieldProps("role")} name="role" className="w-full text-xs h-12 py-2.5 focus:outline-none px-3 rounded bg-white border">
                  <option>role</option>
                  <option value={"buyer"}>Buyer</option>
                  <option value={"seller"}>Farmer</option>
                </select>
                <TextInput
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  rightIcon={
                    showPassword ? (
                      <AiOutlineEye size={24} className='cursor-pointer' />
                    ) : (
                      <AiOutlineEyeInvisible size={24} />
                    )
                  }
                  onRightIconClick={handleClickShowPassword}
                />
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2 rounded'>
                  <input
                    id='remember-me'
                    type='checkbox'
                    className='w-5 h-5'
                  />
                  <label htmlFor='remember-me' className='text-xs'>
                    Remember me
                  </label>
                </div>
                <Link to='/forgot-password'>
                  <a className='text-xs text-black font-satoshiBold'>
                    Forgot password?
                  </a>
                </Link>
              </div>
              <button
                type='submit'
                disabled={false}
                className='bg-black w-full text-white inline-flex items-center justify-center text-center p-2.5 font-extrabold font-satoshiBold disabled:bg-opacity-50'
              >

                Sign In
              </button>
              <p className='text-sm text-center'>
                New?{" "}
                <Link to='/register'>
                  <a className='text-black font-bold'>Sign up</a>
                </Link>
              </p>
            </form>
          </FormikProvider>
        </div>
      </div>
    </main>
  );
}
