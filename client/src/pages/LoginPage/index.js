import { Button, makeStyles, Paper, Snackbar, TextField } from "@material-ui/core";
import { useState, Fragment } from "react";
import createPersistedState from "use-persisted-state";
import { useHistory, Link } from "react-router-dom";

import { ReactComponent as FocusLogo } from "../../images/focus-logo-w-accent.svg";
import styles from "./style.module.scss";

const useTokenState = createPersistedState("token");

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 15,
        },
        "& .MuiInputLabel-root": {
            fontSize: "1.25rem",
            color: "#7d7d7d",
            fontFamily: "'Ropa Sans', sans-serif",
        },
    },

    paper: {
        borderRadius: "20px",
        boxShadow: "0px 0px 31px 13px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        padding: "32px 32px 0 32px",
        width: "480px",
    },

    button: {
        background: "#30a0f5",
        borderRadius: 50,
        color: "#ffffff",
        textTransform: "none",
        fontFamily: "'Ropa Sans', sans-serif",
        fontSize: "1.75rem",
        marginTop: "10px",
        width: "100%",
    },
});

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorOpen, setloginErrorOpen] = useState(false);
    const [token, setToken] = useTokenState();

    const classes = useStyles();
    const history = useHistory();

    const fetchLogin = (username, password) => {
        fetch("http://localhost:9000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
            referrerPolicy: "no-referrer",
        })
            .then((response) => {
                if (!response.ok) {
                    setloginErrorOpen(true);
                    return Promise.reject("Server returned non-200 response");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setToken(data.token);
                history.push("/home");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const submitLogin = (e) => {
        e.preventDefault();
        fetchLogin(email, password);
    };

    const handleLoginErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setloginErrorOpen(false);
    };

    return (
        <div className={styles.container}>
            <Paper className={classes.paper}>
                <div className={styles.logInContainer}>
                    <div style={{ marginBottom: "24px" }}>
                        <FocusLogo width={380} fill="#454545" />
                    </div>
                    <form onSubmit={submitLogin}>
                        <TextField
                            style={{ margin: "10px 0px", width: "100%" }}
                            classes={{ root: classes.root }}
                            label="Email address"
                            variant="outlined"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            style={{ margin: "10px 0px", width: "100%" }}
                            classes={{ root: classes.root }}
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            color="primary"
                            className={classes.button}
                            type="submit"
                            variant="contained"
                        >
                            Sign In
                        </Button>
                    </form>
                    <div style={{ padding: "32px" }}>
                        <Link to="/">Don't have an account? Sign up</Link>
                    </div>
                </div>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={loginErrorOpen}
                autoHideDuration={5000}
                message="Username and/or password is incorrect"
                onClose={handleLoginErrorClose}
                action={
                    <Fragment>
                        <Button color="inherit" size="small" onClick={handleLoginErrorClose}>
                            CLOSE
                        </Button>
                    </Fragment>
                }
            />
        </div>
    );
};

export default LoginPage;
