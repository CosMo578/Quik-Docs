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
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { app } from "../../../../../firebaseConfig";

const ChatMessage = ({ msg, currentUserId }) => {
  let myMessage =
    msg.data.uid === currentUserId
      ? "justify-self-end flex-row-reverse"
      : "justify-self-start";
  let chatDesign =
    msg.data.uid === currentUserId ? "rounded-br-none" : "rounded-bl-none";

    console.log(msg.data?.imageUrl);

  return (
    <div className={`flex items-center gap-4 ${myMessage}`}>
      {msg.data.uid !== currentUserId && (
        <Image
          className="rounded-full"
          src={msg.data?.imageUrl}
          alt={msg.data.alt}
          width={50}
          height={50}
        />
      )}
      <div
        className={`max-w-[70%] space-y-1.5 rounded-full bg-primary-100 px-6 py-3 text-white ${chatDesign}`}
      >
        {msg.data.uid !== currentUserId && (
          <p className="text-sm">{msg.data.username}</p>
        )}
        <p>{msg.data.text}</p>
      </div>
    </div>
  );
};

const db = getFirestore(app);
const ChatRoom = () => {
  const { user } = useUser();
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
    console.log(user);
  }, [messages]);

  const sendMessages = async (e) => {
    e.preventDefault();
    setNewMessages("");
    await addDoc(collection(db, "messages"), {
      uid: user.id,
      username: user.username,
      text: newMessages,
      image: user.imageUrl,
      alt: user.fullName,
      timestamp: serverTimestamp(),
    });
    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    // <main className="relative mx-auto mt-10 h-[70vh] w-[70%] overflow-hidden rounded-md bg-gray-300 p-6">
    // <main className="relative mx-auto h-[80%] mt-20 md:mt-0 md:h-[60%] w-full overflow-hidden rounded-md bg-gray-300 p-6 lg:h-[70vh] lg:w-[80%]">
    <main className="relative flex flex-col overflow-hidden h-screen">
      <section className="h-[85%] w-full overflow-y-scroll">
        <div className="flex flex-col gap-2 px-6">
          {messages?.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} currentUserId={user.id} />
          ))}
        </div>
        <div ref={dummy}></div>
      </section>

      {/* className="absolute bottom-4 left-0 right-0 flex items-center gap-3 px-5" */}
      <form
        className="flex items-center gap-3 p-5"
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
