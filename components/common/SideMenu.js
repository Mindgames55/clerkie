import styles from './SideMenu.module.css'
import MenuItem from './MenuItem';
import HomeIcon from '../../public/home.svg'
import FriendsIcon from '../../public/friends.svg'
import Logo from '../../public/logo.svg'

const homeItem = {
    path: '/',
    title: 'Home'
}

const friendsItem = {
    path: 'friends',
    title: 'Friends'
}

const menuItems = [homeItem, friendsItem];

export default function SideMenu() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo />
                <span className={styles['logo-title']}>Clerkie Challenge</span>
            </div>
            <nav>
                <ul>
                    {menuItems.map(item => 
                        (
                            <MenuItem key={item.path} href={item.path} title={item.title}>
                                {item.path === '/' ? <HomeIcon /> : <FriendsIcon />}
                            </MenuItem>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
}