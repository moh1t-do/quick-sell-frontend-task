import Card from '../Card/Card';
import style from './Dashboard.module.css';
import data from '../../utils/data';
import helper from '../../utils/helper';
import ProfileIcon from '../ProfileIcon/ProfileIcon';


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
                                        <ProfileIcon av={(users[group]).available} />
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
                        {groupedTickets[group].map(ticket => <Card key={ticket.id} ticket={ticket} users={users} currentGroup={currentGroup} />)}
                    </div>
                );
            })}
        </div>
    );
}

export default Dashboard;