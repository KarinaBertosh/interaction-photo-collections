"use-client";
import { useState } from "react";
import styles from "./style.module.css";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const forms = {
  reg: 'reg',
  logIn: 'logIn'
};


export default function Form() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isReg, setIsReg] = useState<boolean>(false);
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<string>(forms.reg);

  const handling = (e: any) => {
    e.preventDefault();

    if (currentForm === forms.reg) {
      if (EMAIL_REGEXP.test(email)) {
        localStorage.setItem(email, JSON.stringify({password: password, favoritePhotos: [] }));
        localStorage.setItem('currentUser', email);
        setEmail('');
        setPassword('');
        setError('');
        setIsReg(!isReg);
      } else {
        setError('Email invalid');
      }
    }

    if (currentForm === forms.logIn) {
      if (EMAIL_REGEXP.test(email)) {
        const currentPass = localStorage.getItem(email);
        if (currentPass === password) {
          setEmail('');
          setPassword('');
          setError('');
          setIsLogIn(!isLogIn);
        }
        else {
          setError('Password invalid');
        }
      } else {
        setError('Email invalid');
      }
    }
  };

  return (
    <>
      {
        isReg
          ? <div className={`${styles.title} ${styles.red}`}> Registration completed successfully</div>
          : isLogIn
            ? <div className={`${styles.title} ${styles.red}`}> LogIn completed successfully</div> :
            <div>
              <form className={styles.form}>
                <div className={styles.title}>{currentForm === forms.reg ? 'Registration' : 'Log in'}</div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e: any) => setEmail(e.target.value)} />
                  <div id="emailHelp" className="form-text">Please indicate false email and password</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" value={password} className="form-control" id="exampleInputPassword1" onChange={(e: any) => setPassword(e.target.value)} />
                </div>
                <div>{error ? error : ''}</div>
                <button type="submit" className="btn btn-primary" onClick={(e: any) => handling(e)} >Submit</button>
              </form>
              {
                currentForm === forms.reg
                  ? <div className={styles.changeForm} onClick={() => setCurrentForm(forms.logIn)}>I have an account, I want to log in</div>
                  : <div className={styles.changeForm} onClick={() => setCurrentForm(forms.reg)}>I don't have an account, I want to log in</div>
              }
            </div>
      }
    </>
  );
}
