import '../stylesheets/message.scss';
import moment from 'moment';

function Message({ msg, close }) {
  const {
    id, title, text, posted,
  } = msg;
  const closeHandle = close;

  return (
    <div className="msg-wrapper">
      <button
        type="button"
        className="closeBtn"
        onClick={(e) => closeHandle(e)}
        data-id={id}
      >
        X
      </button>
      <h5>
        Title: &nbsp;
        {title}
      </h5>
      <p>{text}</p>
      <h5>
        Posted on: &nbsp;
        {moment(posted).format('dddd, MMMM Do YYYY, h:mm:ss a')}
      </h5>
    </div>
  );
}

export default Message;
