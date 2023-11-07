import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [dataUser, setDataUser] = useState({
    userid: '',
    namalengkap: '',
    username: '',
    password: '',
    status: '',
  });
  const [users, setUsers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5555/api/addUser',
        dataUser
      );

      console.log(response.data);

      window.location.reload();

      setDataUser({
        userid: '',
        namalengkap: '',
        username: '',
        password: '',
        status: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/deleteUser/${id}`
      );
      console.log(response.data);
      axios
        .get('http://localhost:5555/api/getUsers')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5555/api/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <form className='mx-auto mt-10 w-1/2' onSubmit={handleSubmit}>
        <div className='mb-6'>
          <label for='Nama Lengkap' className='block mb-2 text-sm font-medium'>
            User Id
          </label>
          <input
            type='text'
            name='userid'
            className='shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            value={dataUser.userid}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-6'>
          <label for='Nama Lengkap' className='block mb-2 text-sm font-medium'>
            Nama Lengkap
          </label>
          <input
            type='text'
            name='namalengkap'
            className='shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            value={dataUser.namalengkap}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-6'>
          <label for='Username' className='block mb-2 text-sm font-medium '>
            Username
          </label>
          <input
            type='text'
            name='username'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            value={dataUser.username}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-6'>
          <label for='password' className='block mb-2 text-sm font-medium '>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            value={dataUser.password}
            onChange={handleInputChange}
          />
        </div>

        <div className='mb-6'>
          <label for='status' className='block mb-2 text-sm font-medium '>
            Status
          </label>
          <input
            type='text'
            name='status'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            value={dataUser.status}
            onChange={handleInputChange}
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Tambah User
        </button>
      </form>

      {/* Table Data */}
      <div className='relative w-1/2 mx-auto overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-10'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                User Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Nama Lengkap
              </th>
              <th scope='col' className='px-6 py-3'>
                Username
              </th>
              <th scope='col' className='px-6 py-3'>
                Password
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.userid}
                className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {user.userid}
                </th>
                <td className='px-6 py-4'> {user.namalengkap} </td>
                <td className='px-6 py-4'> {user.username} </td>
                <td className='px-6 py-4'> {user.password} </td>
                <td className='px-6 py-4'> {user.status} </td>

                <td className='px-6 py-4'>
                  <button
                    type='button'
                    onClick={() => handleDeleteUser(user.userid)}
                    class='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
