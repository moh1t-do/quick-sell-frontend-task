import { useEffect, useState } from 'react';
import style from './Header.module.css';

function Header({ currentGroup, currentOrder, handleGroupChange, handleOrderChange }) {
    const [hideDropdown, setHideDropdown] = useState(true);
    const [hideGroupDropdown, setHideGroupDropdown] = useState(true);
    const [hideOrderDropdown, setHideOrderDropdown] = useState(true);

    useEffect(() => {
        if (!hideGroupDropdown) {
            setHideOrderDropdown(true);
        }
        if (!hideOrderDropdown) {
            setHideGroupDropdown(true);
        }
    }, [hideGroupDropdown, hideOrderDropdown]);

    const handleDropdownClick = (setter) => () => setter(prev => !prev);
    const handleItemClick = (handler, setter) => (e) => {
        handler(e.target.getAttribute('data-value'));
        setter(true);
    };

    return (
        <nav>
            <button className={style.btn} onClick={handleDropdownClick(setHideDropdown)}>
                <img src='/icons/Display.svg' alt='display' />
                <span>Display</span>
                <img className={`${style.arrow_icon} ${hideDropdown ? style.arrow_icon_rotate : ""}`} src='/icons/down.svg' alt='down' />
            </button>
            <ul className={`${style.dropdown} ${style.dropdown_p} ${hideDropdown ? style.dropdown_hide : ""}`}>
                <li className={style.dropdown_list}>
                    <span>Grouping</span>
                    <button className={style.btn} onClick={handleDropdownClick(setHideGroupDropdown)}>
                        <span>{currentGroup.charAt(0).toUpperCase() + currentGroup.slice(1)}</span>
                        <img className={`${style.arrow_icon} ${hideGroupDropdown ? style.arrow_icon_rotate : ""}`} src='/icons/down.svg' alt='down' />
                    </button>
                    <ul className={`${style.dropdown} ${style.dropdown_s} ${hideGroupDropdown ? style.dropdown_hide : ""}`}>
                        {['status', 'user', 'priority'].map(value => (
                            <div key={value}>
                                <li data-value={value} onClick={handleItemClick(handleGroupChange, setHideGroupDropdown)}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </li>
                            </div>
                        ))}
                    </ul>
                </li>
                <li className={style.dropdown_list}>
                    <span>Ordering</span>
                    <button className={style.btn} onClick={handleDropdownClick(setHideOrderDropdown)}>
                        <span>{currentOrder.charAt(0).toUpperCase() + currentOrder.slice(1)}</span>
                        <img className={`${style.arrow_icon} ${hideOrderDropdown ? style.arrow_icon_rotate : ""}`} src='/icons/down.svg' alt='down' />
                    </button>
                    <ul className={`${style.dropdown} ${style.dropdown_s} ${hideOrderDropdown ? style.dropdown_hide : ""}`}>
                        {['priority', 'title'].map(value => (
                            <div key={value}>
                                <li data-value={value} onClick={handleItemClick(handleOrderChange, setHideOrderDropdown)}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </li>
                            </div>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Header;