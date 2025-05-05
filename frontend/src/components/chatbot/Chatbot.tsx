
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat is opened for the first time
      handleBotResponse("Hello! Welcome to SS STEEL INDIA CORPORATION. How can I assist you with our iron and steel products today?");
    }
  }, [isOpen]);
  
  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Focus the input field after sending
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    
    // Process user message and generate response
    processUserMessage(input);
  };
  
  const processUserMessage = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
      handleBotResponse("Hello! How can I help you today?");
    } else if (lowerMsg.includes('product') || lowerMsg.includes('catalog') || lowerMsg.includes('available')) {
      handleBotResponse("We offer a wide range of steel products including structural materials, steel pipes, and sheets/plates. You can view all our products on our Products page.");
    } else if (lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('where')) {
      handleBotResponse("We are located at 756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109. About 40 KM from Bengaluru.");
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('call')) {
      handleBotResponse("You can contact us at:\nPhone: +91 63820 85337, +91 87540 10925\nEmail: sales@sssteelindia.com");
    } else if (lowerMsg.includes('hour') || lowerMsg.includes('timing') || lowerMsg.includes('open')) {
      handleBotResponse("Our business hours are from 9:00 AM to 7:00 PM, Monday to Saturday.");
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('rate')) {
      handleBotResponse("Product prices vary based on type and quantity. Please log in to your customer account to view the latest prices or contact our sales team.");
    } else if (lowerMsg.includes('order') || lowerMsg.includes('buy') || lowerMsg.includes('purchase')) {
      handleBotResponse("To place an order, please login to your customer account, browse our products, add items to your cart, and proceed to checkout. Your order will be reviewed and approved by our team.");
    } else if (lowerMsg.includes('delivery') || lowerMsg.includes('shipping')) {
      handleBotResponse("We offer delivery services within the region. Delivery timeframes depend on your location and order volume. Please contact our team for specific delivery information.");
    } else if (lowerMsg.includes('steel pipe') || lowerMsg.includes('pipes')) {
      handleBotResponse("We offer various steel pipes including MS Round Pipes, MS Square Pipes, and MS Rectangle Pipes. You can view our complete range on the Products page.");
    } else if (lowerMsg.includes('structural') || lowerMsg.includes('angle') || lowerMsg.includes('channel')) {
      handleBotResponse("Our structural materials include Angles, Channels, Flats, I Beams, Square Rods, Round Rods, Bright Bars, TMT Bars, and Weld Mesh. Visit our Products page for details.");
    } else if (lowerMsg.includes('sheet') || lowerMsg.includes('plate')) {
      handleBotResponse("We supply various sheets and plates including HR Sheets/Plates, CR Sheets, GI Sheets, Roofing Sheets, and Chequered Sheets. Check our Products page for more information.");
    } else if (lowerMsg.includes('register') || lowerMsg.includes('signup') || lowerMsg.includes('account')) {
      handleBotResponse("You can register for a customer account by clicking on the Register link at the top of the page. Fill in your details to create an account.");
    } else if (lowerMsg.includes('thank')) {
      handleBotResponse("You're welcome! Feel free to ask if you have any other questions.");
    } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
      handleBotResponse("Thank you for chatting with us. Have a great day!");
    } else {
      handleBotResponse("I'm here to help with information about our steel products and services. If your query is more specific, please call us at +91 63820 85337 or email sales@sssteelindia.com.");
    }
  };
  
  const handleBotResponse = (text: string) => {
    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col h-96 border">
          <div className="bg-steelblue-800 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Chat with Us</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-steelblue-700 h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-steelblue-500 text-white'
                        : 'bg-steelgray-200 text-steelgray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t border-gray-200 flex items-center">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 mr-2"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-steelblue-600 hover:bg-steelblue-700">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="flex items-center bg-steelblue-600 hover:bg-steelblue-700 text-white rounded-full p-3 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
