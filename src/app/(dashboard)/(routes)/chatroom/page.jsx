// import {
//   collection,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   getFirestore,
//   FieldValue,
// } from "firebase/firestore";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { useRef } from "react";

// export const ChatMessage = (props) => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const { text, uid } = props.message;
//   const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

//   return (
//     <div>
//       <Image src={user.imageUrl} alt="" width={60} height={60} />
//       <p>{text}</p>
//     </div>
//   );
// };

// const Chatroom = () => {
//   const db = getFirestore(app);
//   const [messages, setMessages] = useState([]);
//   const messageRef = collection(db, "messages");
//   const { isLoaded, isSignedIn, user } = useUser();

//   const [formValue, setFormValue] = useState("");

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     const { id, imageUrl } = user;

//     await messageRef.add({
//       text: formValue,
//       createdAt: FieldValue.serverTimeStamp(),
//       id,
//       imageUrl,
//     });
//     setFormValue("");
//     empty.current.scrollIntoView({ behaviour: "smaooth" });
//   };

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const q = query(messageRef, orderBy("createdAt"), limit(25));

//       const querySnapshot = await getDocs(q);

//       const messagesData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,

//         ...doc.data(),
//       }));

//       setMessages(messagesData);
//     };

//     fetchMessages();
//   });

//   const empty = useRef();

//   return (
//     <section>
//       <div>
//         {messages &&
//           messages.map((msg) => {
//             return <ChatMessage key={msg.id} message={msg} />;
//           })}
//         <div ref={empty}></div>
//       </div>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           value={formValue}
//           onChange={(e) => setFormValue(e.target.value)}
//         />
//         <button type="submit">Send Msg</button>
//       </form>
//     </section>
//   );
// };
// export default Chatroom;


const ChatRoom = () => {
  return (
    <div>ChatRoom</div>
  )
}
export default ChatRoom