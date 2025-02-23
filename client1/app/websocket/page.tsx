"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '../sockerIO/connection';

function Page() {
  const router = useRouter();
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    interface ReceivedMessage {
      message: string;
    }
    // Listen for messages from a room or broadcast messages
    socket.on("receive_message", (data: ReceivedMessage) => {
      setMessageReceived(data.message);
    });

    // Listen for updates to the available rooms list
    socket.on("rooms_list", (data: string[]) => {
      setRooms(data);
    });

    // Request the initial list of rooms from the server
    socket.emit("get_rooms");

    // Clean up listeners when the component unmounts
    return () => {
      socket.off("receive_message");
      socket.off("rooms_list");
    };
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const leaveRoom = () => {
    if (room !== "") {
      socket.emit("leave_room", room);
      setRoom("");
    }
  };

  const sendMessage = () => {
    if (room !== "") {
      socket.emit("send_message", { message, room });
    }
  };

  const sendMessageAll = () => {
    socket.emit("send_message_all", { message });
  };

  return (
    <div className="min-h-screen w-full bg-bg-gradient-one p-8">
      <button
        onClick={() => handleNavigate("/")}
        className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
        aria-label="Navigate to Back"
      >
        Back
      </button>
      <div className="mb-4">
        <h2 className="text-xl text-white mb-2">Available Rooms:</h2>
        <ul className="text-white">
          {rooms.map((roomName, index) => (
            <li key={index}>{roomName}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="text"
          placeholder="Room Number"
          className="w-1/3 p-2 text-lg font-medium text-black bg-white border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          onClick={joinRoom}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Join Room"
        >
          Join Room
        </button>
        <button
          onClick={leaveRoom}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-red-700 hover:bg-red-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Leave Room"
        >
          Leave Room
        </button>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="text"
          placeholder="Message"
          className="w-1/3 p-2 text-lg font-medium text-black bg-white border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-green-700 hover:bg-green-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Send Message to Room"
        >
          Send Message to Room
        </button>
        <button
          onClick={sendMessageAll}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-purple-700 hover:bg-purple-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Send Message to All"
        >
          Send Message to All
        </button>
      </div>

      <div className="flex flex-row items-center justify-center w-full mt-4">
        <p className="text-lg font-medium text-white">{messageReceived}</p>
      </div>
    </div>
  );
}

export default Page;
