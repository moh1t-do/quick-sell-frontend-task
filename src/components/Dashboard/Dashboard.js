import Card from '../Card/Card';
import style from './Dashboard.module.css';
import data from '../../utils/data';
import helper from '../../utils/helper';


function Dashboard({ currentGroup, users, groupedTickets }) {
    return (
        <div className={style.dashboard}>
            {Object.keys(groupedTickets).map(group => {
                return (
                    <div key={group}>
                        <div className={style.group_name}>
                            <div>
                                <div className={`${style.group_name} ${style.head}`}>
                                    {currentGroup === 'user' && (
                                        <div className={style.pfp_box}>
                                            <img className={style.pfp} src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt='display' />
                                            <div className={`${style.pfp_dot} ${(users[group]).available ? `${style.pfp_dot_green}` : `${style.pfp_dot_red}`}`}></div>
                                        </div>
                                    )}
                                    {currentGroup !== 'user' && <img src={data[helper(group)]} alt='display' />}
                                    {currentGroup === 'status' && <p>{group}{"   "}{groupedTickets[group].length}</p>}
                                    {currentGroup === 'user' && <p>{users[group].name}{"   "}{groupedTickets[group].length}</p>}
                                    {currentGroup === 'priority' && <p>{data[`p${group}`]}{"   "}{groupedTickets[group].length}</p>}
                                </div>
                            </div>
                            <div className={`${style.group_name} ${style.head}`}>
                                <img src='/icons/add.svg' alt='add' />
                                <img src='/icons/3dotmenu.svg' alt='3 dots menu' />
                            </div>
                        </div>
                        {groupedTickets[group].map(ticket => <Card key={ticket.id} ticket={ticket} />)}
                    </div>
                );
            })}
        </div>
    );
}

export default Dashboard;