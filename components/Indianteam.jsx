"use client";
import React, { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Clock, Check, Edit2, Send, Trash2 } from "lucide-react";

// Reusable Components
const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyles = "font-bold cursor-pointer px-4 py-2 rounded transition-all text-white flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-[#ff6f61] to-[#f86e4f] hover:from-[#f56a50] hover:to-[#e95b40]",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ type = "text", value, onChange, placeholder }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="p-3 rounded border-none bg-[#243b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] w-full"
  />
);

const TextArea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={3}
    className="p-3 rounded border-none bg-[#243b4a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] w-full resize-none"
  />
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
      <div className="w-full max-w-md rounded-lg border-t-4 border-green-400"
        style={{
          background: "linear-gradient(to right, #001f3d, #374958)",
        }}>
        {children}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Draft: { icon: Edit2, className: "bg-gray-500", text: "Draft" },
    Pending: { icon: Clock, className: "bg-yellow-500", text: "Pending" },
    Approved: { icon: Check, className: "bg-green-500", text: "Approved" }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <span className={`${statusConfig[status].className} px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit`}>
      <StatusIcon size={14} />
      {statusConfig[status].text}
    </span>
  );
};

const Card = ({ children }) => (
  <div className="bg-[#243b4a] border border-gray-700 rounded-lg p-4 shadow-lg transition-all hover:shadow-xl">
    {children}
  </div>
);

// Main Component
export default function IndianTeamUI() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [content, setContent] = useState([]);
  const [newHeading, setNewHeading] = useState("");
  const [newContent, setNewContent] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setAuthenticated(true);
      setModalOpen(false);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleAddContent = () => {
    if (newHeading && newContent) {
      if (editIndex === null) {
        setContent([...content, { 
          heading: newHeading, 
          content: newContent, 
          status: "Pending",
          timestamp: new Date().toLocaleString()
        }]);
        toast.success("Content added and pending review!");
      } else {
        const updatedContent = [...content];
        updatedContent[editIndex] = { 
          heading: newHeading, 
          content: newContent, 
          status: "Pending",
          timestamp: new Date().toLocaleString()
        };
        setContent(updatedContent);
        setEditIndex(null);
        toast.success("Content updated and pending review!");
      }
      setNewHeading("");
      setNewContent("");
    } else {
      toast.error("Please fill in both fields.");
    }
  };

  const handleEdit = (index) => {
    setNewHeading(content[index].heading);
    setNewContent(content[index].content);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
    toast.success("Content deleted successfully!");
  };

  const handleSubmit = (index) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      status: "Approved",
      timestamp: new Date().toLocaleString()
    };
    setContent(updatedContent);
    toast.success("Content approved!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center"
      style={{
        background: "linear-gradient(to right, #001f3d, #374958)",
      }}>
      

      <Modal isOpen={modalOpen}>
        <div className="p-6 space-y-4">
          <h1
            className="text-2xl font-bold text-center"
            style={{
              background: "linear-gradient(to right, #ff6f61, #f86e4f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Login
          </h1>
          <Input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
          />
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </Modal>

      {authenticated && (
        <div className="w-full max-w-3xl p-6">
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{
              background: "linear-gradient(to right, #ff6f61, #f86e4f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Indian Team Content Management
          </h2>
          <Card>
            <div className="space-y-4 p-4">
              <Input 
                type="text" 
                value={newHeading} 
                onChange={(e) => setNewHeading(e.target.value)} 
                placeholder="Enter heading" 
              />
              <TextArea 
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)} 
                placeholder="Enter content" 
              />
              <Button onClick={handleAddContent}>
                {editIndex === null ? (
                  <>
                    <Send size={18} />
                    Add Content
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    Update Content
                  </>
                )}
              </Button>
            </div>
          </Card>

          <div className="mt-6 space-y-4">
            {content.map((item, index) => (
              <Card key={index}>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold" style={{
                      background: "linear-gradient(to right, #ff6f61, #f86e4f)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                      {item.heading}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-white">{item.content}</p>
                  <div className="text-sm text-gray-400">
                    Last updated: {item.timestamp}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="warning" 
                      onClick={() => handleEdit(index)}
                      className="w-24"
                    >
                      <Edit2 size={18} />
                      Edit
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => handleSubmit(index)}
                      className="w-24"
                      disabled={item.status === "Approved"}
                    >
                      <Send size={18} />
                      Submit
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(index)}
                      className="w-24"
                    >
                      <Trash2 size={18} />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}