import {useState,useEffect} from 'react'
import { postDataApi, profileDataApi, likePost } from '../Api/index';
import Card from '../Components/Card/Card'
import Loader from '../Components/Loader/Loader'
import Header from '../Components/Header/Header'
import styles from '../styles/demo.module.css';

const Demo=()=>{
    const[data,setData]=useState([])
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
        getUserDetails();
    },[]);

    const getUserDetails = () => {
        setLoading((prevState) => !prevState);   
        profileDataApi()
        .then((response) => {
          setLoading((prevState) => !prevState);
          setData(response.data)
        })
        .catch((err) => {
          setLoading((prevState) => !prevState);
        })
    }

    const postImage = (base64) => {
      setLoading((prevState) => !prevState);
      postDataApi({img: base64})
      .then((response) => {
        setLoading((prevState) => !prevState);
        setData([...data, response.data])
        document.getElementById("fileUpload").reset();
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
      })
  }

  const likeThePost = (id) => {
    setLoading((prevState) => !prevState);
    likePost(id)        
    .then((response) => {
      setLoading((prevState) => !prevState);
      getUserDetails();
    })
    .catch((err) => {
      setLoading((prevState) => !prevState);
    })
  }
      

    return(
        <div className={styles.demoContainer}>
            <Header postImage={postImage}/>
            <div className="main-container">
              { data.length ? (
                <div className={styles.cardList}>
                  {/*  */}
                  { data.map((data,index)=><Card likeThePost={() => likeThePost(data._id)} img={data.img} likes={data.likes} key={index}/>) } 
                </div>) : null 
              }
              { loading ? <Loader /> : null }
            </div>
        </div>
    )

}

export default Demo