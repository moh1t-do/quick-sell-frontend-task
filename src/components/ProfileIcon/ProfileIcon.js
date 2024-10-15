import style from './ProfileIcon.module.css';

function ProfileIcon({ av }) {
    return (<div className={style.pfp_box}>
        <img className={style.pfp} src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt='display' />
        <div className={`${style.pfp_dot} ${av ? `${style.pfp_dot_green}` : `${style.pfp_dot_red}`}`}></div>
    </div>);
}

export default ProfileIcon;