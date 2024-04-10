import { useState } from 'react';

const ContactForm = () => {
  const [firstNameInput, setfirstNameInput] = useState('');
  const [lastNameInput, setlastNameInput] = useState('');
  const [emailInput, setemailInput] = useState('');
  const [phoneInput, setphoneInput] = useState('');
  const [messageInput, setmessageInput] = useState('');
  const [isValid, setisValid] = useState(true);
  const [errorMessage, seterrorMessage] = useState();
  const [isSent, setisSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisSent(validateForm());
  };

  const validateForm = () => {
    let messageArray = [];
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      'gm'
    );
    const swedishPhoneRegEx = new RegExp(
      /^(?:\+?46|0)(?:\s*)?7[0236](?:\s*)?\d{4}(?:\s*)\d{3}$/,
      'gm'
    );

    firstNameInput.length == 0 &&
      messageArray.push("First name can't be empty");
    lastNameInput.length == 0 && messageArray.push("Last name can't be empty");
    !emailRegex.test(emailInput) &&
      messageArray.push('Not a valid e-mail adress');
    !swedishPhoneRegEx.test(phoneInput) &&
      messageArray.push(
        'Not a valid Swedish phone number (+467XXXXXXXX/07XXXXXXXX)'
      );
    messageInput.length < 10 &&
      messageArray.push('Message needs to be at least 10 characters');

    const errorDiv = (
      <>
        {messageArray.map((mess, index) => (
          <span key={index} className="notice notice--error">
            {mess}
          </span>
        ))}
      </>
    );

    setisValid(!messageArray.length);
    seterrorMessage(errorDiv);
    return !messageArray.length;
  };
  if (isSent)
    return 'Thank you for your message! We will get back to you as soon as possible.';
  return (
    <div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div id="contactFormError" className={isValid ? 'hide' : ''}>
          {errorMessage}
        </div>
        <label>
          <span>First name</span>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstNameInput}
            onChange={(e) => setfirstNameInput(e.target.value)}
          />
        </label>

        <label>
          <span>Last name</span>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastNameInput}
            onChange={(e) => setlastNameInput(e.target.value)}
          />
        </label>

        <label>
          <span>E-Mail</span>
          <input
            type="email"
            id="email"
            name="email"
            value={emailInput}
            onChange={(e) => setemailInput(e.target.value)}
          />
        </label>

        <label>
          <span>Phone Number</span>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phoneInput}
            onChange={(e) => setphoneInput(e.target.value)}
          />
        </label>

        <label>
          <span>Message</span>
          <textarea
            id="message"
            name="message"
            value={messageInput}
            onChange={(e) => setmessageInput(e.target.value)}
          ></textarea>
        </label>

        <button className="action-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
