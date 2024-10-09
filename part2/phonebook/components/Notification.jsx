const Notification = ({ message }) => {
  if (message.msg == null) {
    return null;
  }
  return (
    <div className={message.statusCode ? "error" : "notification"}>
      {message.msg}
    </div>
  );
};

export default Notification;
