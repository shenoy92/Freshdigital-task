import FileBase64 from 'react-file-base64';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
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

    return (
        <div className={styles.header}>
            <div>
            <span>
            <form id="fileUpload">
                <FileBase64  type="file" multiple={false} onDone={({ base64 }) => {postImage(base64)}}/>
            </form></span>
            <span><ChatBubbleOutlineIcon/> </span>
            <span><DoubleArrowIcon /></span>
            </div>
            <div className={styles.title}>
                <span>Design Demo 2</span>
                <span><select></select></span>
                <span >View only</span>
            </div>
            <div className={styles.left}>
                <span>Share</span>
                <span ><ArrowRightIcon/></span>
                <Button color='Secondary' variant='contained' onClick={logout}>LOGOUT</Button>
            </div>

        </div>
    )
}
export default Header