import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState({});
  const [tickets, setTickets] = useState([]);
  const [currentGroup, setCurrentGroup] = useState('status');
  const [currentOrder, setCurrentOrder] = useState('priority');
  const [groupedTickets, setGroupedTickets] = useState({});

  function handleGroupChange(group) {
    setCurrentGroup(group);
    setGroupedTickets(sortTickets(groupTickets(tickets, group)), currentGroup);
  }

  function handleOrderChange(order) {
    setCurrentOrder(order);
  }


  function groupTickets(tickets, groupBy) {
    return tickets.reduce((groups, ticket) => {
      let group = ticket[groupBy];
      if (groupBy === 'user') {
        group = ticket['userId'];
      }

      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(ticket);
      return groups;
    }, {});
  }

  function mapUsers(data) {
    setUsers(data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {}));
  }

  function sortTickets(groupedTickets, sortBy) {
    const sortedTickets = {};
    Object.keys(groupedTickets).forEach(group => {
      sortedTickets[group] = groupedTickets[group].sort((a, b) => {
        if (sortBy === 'priority') {
          return (b.priority || 0) - (a.priority || 0);
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });
    return sortedTickets;
  }

  useEffect(() => {
    handleGroupChange(currentGroup);
  }, [tickets])

  useEffect(() => {
    setGroupedTickets(sortTickets(groupedTickets, currentOrder));
  }, [currentOrder])

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        mapUsers(res.data.users);
        setTickets(res.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets', error);
      }
    }
    fetchTickets();
  }, []);

  return (
    <>
      <Header currentGroup={currentGroup} currentOrder={currentOrder} handleGroupChange={handleGroupChange} handleOrderChange={handleOrderChange} />
      <Dashboard groupedTickets={groupedTickets} users={users} currentGroup={currentGroup} />
    </>
  )
};

export default App;
