import '../stylesheets/signup.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [msg, setMsg] = useState();

  const {
    register, handleSubmit, reset, formState,
  } = useForm();
  const apiURL = `${process.env.REACT_APP_BASE_API}/signup`;
  const submitHandler = (data) => {
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
        setMsg(datares.message);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    fetchData();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        email: '',
        password: '',
        passwordrepeat: '',
      });
    }
  }, [formState, reset]);

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
        <h1>Sign Up</h1>
        <p>Please fill in the form to create an account.</p>
        <hr />
        <label htmlFor="name">
          Full Name
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            required
            {...register('name')}
          />
        </label>
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
        <label htmlFor="passwordrepeat">
          Repeat password
          <input
            type="password"
            placeholder="Repeat Password"
            name="passwordrepeat"
            required
            {...register('passwordrepeat')}
          />
        </label>
        <div className="row">
          <button type="submit">Proceed</button>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </div>
        <p className="msg">{msg}</p>
      </form>
    </div>
  );
}

export default Signup;
