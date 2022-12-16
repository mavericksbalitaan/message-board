import '../stylesheets/message.scss';
import moment from 'moment';

function Message({ msg }) {
  const { title, text, posted } = msg;
  return (
    <div className="msg-wrapper">
      <h3>
        Subject: &nbsp;
        {title}
      </h3>
      <h3>
        Message: &nbsp;
        {text}
      </h3>
      <h3>
        Posted: &nbsp;
        {moment(posted).format('MM-DD-YYYY')}
      </h3>
    </div>
  );
}

export default Message;
