import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../stylesheets/board.scss';
import { nanoid } from 'nanoid';
import moment from 'moment';
import Message from './Message';

function Board() {
  const { register, handleSubmit, formState } = useForm();
  const [isHidden, setIsHidden] = useState('none');

  const apiURL = `${process.env.REACT_APP_BASE_API}/messages`;
  const createURL = `${process.env.REACT_APP_BASE_API}/createmessage`;
  const [msg, setMsg] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setMsg(data);
    }
    fetchData();
  }, []);

  const submitHandler = (data) => {
    const objdata = {
      ...data,
      userid: localStorage.getItem('userid'),
      posted: moment().format('YYYY-MM-DD'),
    };
    console.log(objdata);
    async function fetchData() {
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
        console.log(datares);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    fetchData();
  };

  return (
    <div className="board-wrapper">
      <button type="button" onClick={() => setIsHidden('flex')}>
        + Create New
      </button>
      <div className="modal" style={{ display: isHidden }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              placeholder="Title"
              name="title"
              {...register('title', { required: true })}
            />
          </label>
          <label htmlFor="text">
            Text
            <textarea
              type="text"
              placeholder="Text"
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
          msg.map((el) => <Message key={nanoid()} msg={el} />)
        ) : (
          <h3>Loading data ...</h3>
        )}
      </div>
    </div>
  );
}

export default Board;
