import React from 'react';
import LoadingImg from '../../assets/loading.gif';
import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <img alt="loader" src={LoadingImg}/>
        </div>
    );
  }
  
  export default Loader;