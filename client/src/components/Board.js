import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../stylesheets/board.scss';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Message from './Message';

function Board() {
  const username = localStorage.getItem('name');
  const { register, handleSubmit } = useForm();
  const [isHidden, setIsHidden] = useState('none');

  const navigate = useNavigate();

  // api routes
  const apiURL = `${process.env.REACT_APP_BASE_API}/messages`;
  const createURL = `${process.env.REACT_APP_BASE_API}/createmessage`;
  const delURL = `${process.env.REACT_APP_BASE_API}/deletemessage`;
  const [msg, setMsg] = useState();

  async function fetchData() {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: localStorage.getItem('userid') }),
    });
    const data = await response.json();
    setMsg(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = (data) => {
    const objdata = {
      ...data,
      userid: localStorage.getItem('userid'),
      posted: moment().format(),
    };
    async function fetch1Data() {
      try {
        const response = await fetch(createURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objdata),
        });
        const datares = await response.json();
        if (datares.token !== 'undefined') {
          setIsHidden('none');
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    fetch1Data();
    fetchData();
  };

  const closeHandler = (e) => {
    const data = {
      id: e.target.dataset.id,
    };
    async function delData() {
      try {
        await fetch(delURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    delData();
    fetchData();
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="board-wrapper">
      <h1>
        Your message board,
        {username}
        !
      </h1>
      <button type="button" onClick={() => setIsHidden('flex')}>
        + Create New
      </button>
      <button type="button" onClick={() => logoutHandler()}>
        Logout
      </button>
      <div className="modal" style={{ display: isHidden }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              placeholder="Input title"
              name="title"
              {...register('title', { required: true })}
            />
          </label>
          <label htmlFor="text">
            Text
            <textarea
              type="text"
              placeholder="Your message here"
              name="text"
              cols={50}
              rows={10}
              {...register('text', { required: true })}
            />
          </label>
          <div className="row-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={() => setIsHidden('none')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="board-container">
        {msg ? (
          msg.map((el) => (
            <Message key={nanoid()} msg={el} close={closeHandler} />
          ))
        ) : (
          <h3>Loading data ...</h3>
        )}
      </div>
    </div>
  );
}

export default Board;
