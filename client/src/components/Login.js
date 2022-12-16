import '../stylesheets/login.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();
  const apiURL = `${process.env.REACT_APP_BASE_API}/login`;
  const submitHandler = (data) => {
    console.log(data);
    async function fetchData() {
      try {
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const datares = await response.json();
        if (datares.token !== 'undefined') {
          setActive(true);
        }
        console.log(datares);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    fetchData();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: '',
        password: '',
      });
    }

    if (active === true) {
      navigate('/board');
    }
  }, [formState, reset, active]);

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
        <h1>Login</h1>
        <p>Please fill in the form to login an account.</p>
        <hr />
        <label htmlFor="email">
          Email Address
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            required
            {...register('email')}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            {...register('password')}
          />
        </label>
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/signup">
            <button type="button">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
