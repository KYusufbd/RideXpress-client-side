import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { isStrongPassword } from "validator";
import { toast } from "react-toastify";

const Login = () => {
  const [warning, setWarning] = useState(false);
  const { loginWithGoogle, register, signIn, user } = useContext(AuthContext);

  // Handle Login function
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password);
  };

  // Handle Register function
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const imageURL = e.target.imageURL.value;
    if (isPasswordValid(password)) {
      register(name, email, password, imageURL);
      e.target.reset();
    } else {
      toast("Invalid passowrd!");
      setWarning(true);
    }
  };

  // Function for password validation:
  const isPasswordValid = (pass) => {
    return isStrongPassword(pass, {
      minLength: 6,
      minNumbers: 0,
      minSymbols: 0,
      minLowercase: 1,
      minUppercase: 1,
    });
  };

  // Navigating logged in users to home page.
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [navigate, user]);

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row max-w-6xl">
          <div className="text-center lg:text-left px-4 md:px-8 lg:px-12">
            <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold max-w-100">
              Get Started with RideXpress!
            </h1>
            <p className="py-6 text-lg opacity-80 max-w-120 font-medium">
              Book your dream ride, manage rentals, and explore the best
              deals—all in one place. Log in or create an account to hit the
              road with ease!
            </p>
          </div>
          <Tabs>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanel>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                  <form onSubmit={handleLogin} className="fieldset">
                    <label className="fieldset-label">Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Email"
                    />
                    <label className="fieldset-label">Password</label>
                    <input
                      required
                      name="password"
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                    <div>
                      <a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                  </form>
                  <p>
                    Don&apos;t have an account? Register instead.
                  </p>
                  <p className="text-center -mb-4">Or</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={loginWithGoogle}
                  >
                    Continue With Google
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                  <form onSubmit={handleRegister} className="fieldset">
                    <label className="fieldset-label">Name</label>
                    <input
                      name="name"
                      required
                      type="text"
                      className="input"
                      placeholder="Name"
                    />
                    <label className="fieldset-label">Email</label>
                    <input
                      name="email"
                      required
                      type="email"
                      className="input"
                      placeholder="Email"
                    />
                    <label className="fieldset-label">
                      Photo URL (Optional)
                    </label>
                    <input
                      name="imageURL"
                      type="url"
                      className="input"
                      placeholder="Photo URL"
                    />
                    <label className="fieldset-label">Password</label>
                    <input
                      name="password"
                      required
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                    {warning && (
                      <p className="text-warning">
                        Password must be at least 6 characters long and include
                        at least one uppercase letter and one lowercase letter.
                      </p>
                    )}
                    <button className="btn btn-neutral mt-4">Register</button>
                  </form>
                  <p>
                    Already have an account? Login instead.
                  </p>
                  <p className="text-center -mb-4">Or</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={loginWithGoogle}
                  >
                    Continue With Google
                  </button>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Login;
