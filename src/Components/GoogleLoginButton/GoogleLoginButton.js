import { useGoogleLogin } from '@react-oauth/google';


const BtnLoginGG = () => {
  const { signIn } = useGoogleLogin({
    clientId: '273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com',
    onSuccess: (response) => {
      console.log('Logged in successfully!', response);
    },

    onError: (err) => {
      console.log(`Login failure with ${err}`)
    },

  }); 



  return (
    <div>
      <h2>Sign in with Google</h2>
      <button onClick={signIn} >Login with Goggle 🚀</button>
    </div>
  );

}

export default BtnLoginGG