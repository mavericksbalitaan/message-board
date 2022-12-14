import '../stylesheets/message.scss';

function Message({ msg }) {
  const { text, user, posted } = msg;
  return (
    <div className="msg-wrapper">
      <h1>{text}</h1>
      <h1>{user}</h1>
      <h1>{posted}</h1>
    </div>
  );
}

export default Message;
