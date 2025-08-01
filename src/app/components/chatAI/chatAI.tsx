'use client';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Send, Person, SmartToy } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import MCPClientAction from '@/app/server/actions/mcp/mcpClientAction';
import { marked } from 'marked';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Props {
  onClose?: () => void;
}

export default function ChatAI({ onClose }: Props) {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte con tus actividades?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [waitingResponse, setWaitingResponse] = useState(false);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    setWaitingResponse(true);
    const response = await MCPClientAction(inputMessage);
    setWaitingResponse(false);
    const aiResponse: Message = {
      id: messages.length + 2,
      text: response,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiResponse]);
    setInputMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Área de conversación */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          mb: 2,
        }}
      >
        {messages.map((message, idx) => (
          <Box
            key={message.id}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              mb: 2,
              flexDirection: message.isUser ? 'row-reverse' : 'row',
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mx: 1,
                backgroundColor: message.isUser ? '#1976d2' : '#9c27b0',
              }}
            >
              {message.isUser ? <Person /> : <SmartToy />}
            </Avatar>
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor: message.isUser ? '#e3f2fd' : '#fff',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: marked(message.text) }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: 'block' }}
              >
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Área de entrada de mensaje */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Escribe tu mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          variant="outlined"
          size="small"
          disabled={waitingResponse}
        />

        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === '' || waitingResponse}
          sx={{ minWidth: 'auto', px: 2 }}
        >
          {waitingResponse ? <CircularProgress size={24} /> : <Send />}
        </Button>
      </Box>
    </Box>
  );
}
