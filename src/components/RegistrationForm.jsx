import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseSettings';

export const RegistrationForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, login, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('user: ', user);
      })
      .catch(error => {
        console.log('errorCode: ', error.code);
        console.log('errorMessage: ', error.message);
      });

    setLogin('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h4>Register form</h4>
      <input
        type="text"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};
