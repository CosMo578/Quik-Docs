"use client";
import {
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { app } from "../../../../../firebaseConfig";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const ChatMessage = ({ msg, currentUserId }) => {
  let myMessage =
    msg.data.uid === currentUserId
      ? "justify-self-end flex-row-reverse"
      : "justify-self-start";
  return (
    <div className={`flex items-center gap-4 ${myMessage}`}>
      <Image
        className="rounded-full"
        src={msg.data?.imageUrl}
        alt={msg.data.alt}
        width={50}
        height={50}
      />
      <div className="space-y-1.5 rounded-xl bg-primary-100 px-4 py-3 text-white">
        <p className="text-sm">{msg.data.username}</p>
        <p>{msg.data.text}</p>
      </div>
    </div>
  );
};

const db = getFirestore(app);
const ChatRoom = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const dummy = useRef();

  useEffect(() => {
    const qury = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(qury, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
      );
    });

    return unsubscribe;
  }, []);

  const sendMessages = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      uid: user.id,
      username: user.username,
      text: newMessages,
      image: user.imageUrl,
      alt: user.fullName,
      timestamp: serverTimestamp(),
    });
    setNewMessages("");
    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <main className="h-full overflow-y-clip">
      <section>
        <div className='flex flex-col gap-2 px-6'>
        {messages?.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} currentUserId={user.id} />
        ))}
        </div>
        <div ref={dummy}></div>
      </section>

      <form onSubmit={(e) => sendMessages(e)}>
        <input
          className='rounded-2xl p-3 bg-green-200  mr-4'
          type="text"
          value={newMessages}
          placeholder='Message'
          onChange={(e) => setNewMessages(e.target.value)}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </main>
  );
};
export default ChatRoom;
