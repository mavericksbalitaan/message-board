import { useEffect, useState } from 'react';
import '../stylesheets/board.scss';
import { nanoid } from 'nanoid';
import Message from './Message';

function Board() {
  const apiURL = `${process.env.REACT_APP_BASE_API}/messages`;
  const [msg, setMsg] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      setMsg(data);
    }
    fetchData();
  }, []);

  return (
    <div className="board-bg">
      {msg ? (
        msg.map((el) => <Message key={nanoid()} msg={el} />)
      ) : (
        <h1>Loading data ...</h1>
      )}
    </div>
  );
}

export default Board;
