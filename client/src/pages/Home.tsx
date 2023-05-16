import axiosInstance from 'helpers/intercepter';

const Home = () => {
  const profile = () => {
    axiosInstance
      .post(process.env.REACT_APP_USER_PROFILE_URL || '', { withCredentials: true })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  return (
    <>
      <button onClick={profile}>click</button>
      <h1>HOME</h1>
    </>
  );
};

export default Home;
