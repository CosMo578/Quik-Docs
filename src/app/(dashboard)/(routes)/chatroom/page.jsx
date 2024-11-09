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
import Image from "next/image";
import { Send } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "@/app/config/firebase";
import { AuthContext } from '@/app/Context/AuthContext';

const ChatMessage = ({ msg, currentUserId }) => {
  let myMessage =
    msg.data.userEmail === currentUserId
      ? "justify-self-end flex-row-reverse"
      : "justify-self-start";
  let chatDesign =
    msg.data.userEmail === currentUserId
      ? "rounded-br-none"
      : "rounded-bl-none";

  return (
    <div className={`flex items-center gap-4 ${myMessage}`}>
      {msg.data.userEmail !== currentUserId && msg?.data?.imageUrl && (
        <Image
          className="rounded-full"
          src='/user-dummy.png'
          alt='user image'
          width={50}
          height={50}
        />
      )}
      <div
        className={`max-w-fit space-y-1.5 rounded-[6rem] bg-primary-100 px-6 py-3 text-white ${chatDesign}`}
      >
        {msg.data.userEmail !== currentUserId && (
          <p className="text-md font-bold">{msg.data.userEmail}</p>
        )}
        <p>{msg.data.text}</p>
      </div>
    </div>
  );
};

const ChatRoom = () => {
  const { currentUser } = useContext(AuthContext);
  const userEmail = currentUser?.email;

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

  useEffect(() => {
    dummy.current.scrollIntoView({ behaviour: "smooth" });
    console.log(currentUser);
  }, [messages, currentUser]);

  const sendMessages = async (e) => {
    e.preventDefault();
    setNewMessages("");

    await addDoc(collection(db, "messages"), {
      userEmail: userEmail,
      text: newMessages,
      timestamp: serverTimestamp(),
    });
    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <main className="relative flex h-[90vh] flex-col overflow-hidden pt-12">
      <section className="h-[85%] w-full overflow-y-scroll">
        <div className="flex flex-col gap-2 px-6">
          {messages?.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} currentUserId={userEmail} />
          ))}
        </div>
        <div ref={dummy}></div>
      </section>

      <form
        className="sticky bottom-0 left-0 right-0 flex items-center gap-3 p-5"
        onSubmit={(e) => sendMessages(e)}
      >
        <input
          className="w-full rounded-full border-primary-100 p-3 pl-6"
          type="text"
          value={newMessages}
          placeholder="Message"
          onChange={(e) => setNewMessages(e.target.value)}
          required
        />
        <button
          className="rounded-full bg-primary-100 p-4 font-medium text-white"
          type="submit"
        >
          <Send />
        </button>
      </form>
    </main>
  );
};
export default ChatRoom;
