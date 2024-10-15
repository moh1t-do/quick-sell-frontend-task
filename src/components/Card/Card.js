import style from './Card.module.css';
import data from '../../utils/data';
import helper from '../../utils/helper';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

function Card({ ticket, currentGroup, users }) {
    const { id, title, status, priority, userId } = ticket;
    return (<div className={style.card}>
        <div className={style.header}>
            <p>{id}</p>
            {currentGroup !== 'user' && <ProfileIcon av={(users[userId]).available} />}
        </div>
        <div className={style.body}>
            {currentGroup !== "status" && <img src={data[helper(status)]} alt='status icon' />}
            <p>{title}</p>
        </div>
        <div className={style.footer}>
            {currentGroup !== "priority" && <button className={style.card_btn}>
                <img src={`${data[`${priority}`]}`} alt='3 dots menu' />
            </button>
            }
            <button className={style.card_btn}>
                <div className={style.card_circle}></div>
                <span>
                    Feature Request
                </span>
            </button>
        </div>
    </div>);
}

export default Card;