import style from './Card.module.css';

function Card({ ticket }) {
    const { id, title } = ticket;
    return (<div className={style.card}>
        <div className={style.header}>
            <p>{id}</p>
        </div>
        <div className={style.body}>
            <p>{title}</p>
        </div>
        <div className={style.footer}>
            <button className={style.card_btn}>
                <img src='/icons/3dotmenu.svg' alt='3 dots menu' />
            </button>
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