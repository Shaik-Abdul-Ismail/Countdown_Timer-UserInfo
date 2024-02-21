import React, { useState, useEffect } from 'react';
import './userInfo.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedUsers, setSortedUsers] = useState([]);
  const [pastSearchTerms, setPastSearchTerms] = useState(() => {
    const storedTerms = localStorage.getItem('pastSearchTerms');
    return storedTerms ? JSON.parse(storedTerms) : [];
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setSortedUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('pastSearchTerms', JSON.stringify(pastSearchTerms));
  }, [pastSearchTerms]);

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedUsers(filteredUsers);
    if (searchTerm.trim() !== '') {
      setPastSearchTerms(prevTerms => [...prevTerms, searchTerm]);
    }
    setSearchTerm('');
  };

  const handleSort = () => {
    const sorted = [...sortedUsers].sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(sorted);
  };

  const handleReset = () => {
    setPastSearchTerms([]);
  };

  return (
    <div>
        <br></br>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search by name..."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleSort}>Sort by Name</button>
      
      <div>
        <h2>User List</h2>
        <ol className="user-list">
          {sortedUsers.map((user) => (
              <li key={user.id}>{user.name}</li>
              ))}
        </ol>
      </div>

      <div>
        <h2>Past Search Terms</h2>
        <ul>
          {pastSearchTerms.map((term, index) => (
              <li key={index}>{term}</li>
             ))}
              <button onClick={handleReset}>Reset</button> 
        </ul>
      </div>
    </div>
  );
};

export default UserList;
