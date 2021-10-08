import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Auth from '../../Auth/Auth'
import styles from './header.module.css';
import {useHistory} from 'react-router-dom'
import { Button } from '@material-ui/core';



const Header=({ postImage })=>{
const history=useHistory()

    const logout = () => {
        Auth.logout(() => {
            history.push('/');
        })
    }

    const getBase64 = () => {
        var file = document.querySelector('#file').files[0];
        const base64 = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
        base64.then(data => postImage(data))
      }
      

    return (
        <div className={styles.header}>
            <div className={styles.leftItem}>
                <label htmlFor="fileUpload">
                    <CloudUpload/>
                    <input id="fileUpload" type='file' onChange={() => getBase64()}/>
                </label>
                <ChatBubbleOutlineIcon/>
                <DoubleArrowIcon />
            </div>
            <div className={styles.centerItem}>
                <select>
                    <option value="Design Demo 2">Design Demo 1</option>
                    <option selected="selected" value="Design Demo 2">Design Demo 2</option>
                    <option value="Design Demo 2">Design Demo 3</option>
                    <option value="Design Demo 2">Design Demo 4</option>
                </select>
                <span >View only</span>
            </div>
            <div className={styles.rightItem}>
                <span>Share</span>
                <span ><ArrowRightIcon/></span>
                <span><Button color='Secondary' variant='contained' onClick={logout}>LOGOUT</Button></span>
            </div>

        </div>
    )
}
export default Header
