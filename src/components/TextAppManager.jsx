import { useState, useEffect } from "react";
import TextApp from "./TextApp";
import Constants from '../constants/Constants';
import useStorage from "./hooks/useStorage";

import { Container, Dropdown, Nav, NavItem, NavLink } from "react-bootstrap";

export default function TextAppManager() {

    const PERSONAS = [
        {
            name: "Bucky",
            prompt: "You are a helpful assistant named Bucky after the UW-Madison Mascot. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Bucky. How can I help you?"
        },
        {
            name: "Pirate Pete",
            prompt: "You are a helpful pirate assisting your mateys with their questions. Respond like a pirate would. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Pete the Pirate. How can I help you?"
        },
        {
            name: "Whiskers",
            prompt: `You are an extremely cute and helpful cat. Exaggerate your responses with lots of meows, purrs, mrrrows, and other playful cat-like sounds and emojis too. 
                    Stay fully in character as a cat, but still make sure to understand and respond helpfully to the user's needs.`,
            initialMessage: "Hello, my name is Whiskers. How can I help you?"
        }
    ];

    const [personaName, setPersonaName] = useStorage("chat-persona", PERSONAS[0].name);
    const [messages, setMessages] = useStorage("chat-data", []);

    const persona = PERSONAS.find(p => p.name === personaName);

    function handleNewChat() {
        const initialBody = [{
                role: Constants.Roles.Developer,
                content: persona.prompt
            },
            {
                role: Constants.Roles.Assistant,
                content: persona.initialMessage
            }
        ];
        
        setMessages(initialBody);
        localStorage.setItem("chat-data", JSON.stringify(initialBody));
    }

    function handleSwitchPersona(selectedPersona) {
        setMessages([
            {
                role: Constants.Roles.Developer,
                content: PERSONAS.find(p => p.name === selectedPersona).prompt
            },
            {
                role: Constants.Roles.Assistant,
                content: PERSONAS.find(p => p.name === selectedPersona).initialMessage
            }
        ]);
      
        setPersonaName(selectedPersona);
        localStorage.setItem("chat-persona", JSON.stringify(selectedPersona));
    }
    
    useEffect(() => {
        if (messages.length === 0) {
            handleNewChat();
        }
    }, []);

    return <Container style={{ marginTop: "0.25rem" }}>
        <Nav justify variant="tabs">
            <Nav.Item>
                <Nav.Link onClick={handleNewChat}>New Chat</Nav.Link>
            </Nav.Item>
            <Dropdown as={NavItem} onSelect={handleSwitchPersona}>
                <Dropdown.Toggle as={NavLink}>Personas</Dropdown.Toggle>
                <Dropdown.Menu >
                    {
                        PERSONAS.map(p => <Dropdown.Item key={p.name} eventKey={p.name} active={personaName === p.name}>{p.name}</Dropdown.Item>)
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
        <TextApp persona={persona} messages={messages} setMessages={setMessages}/>
    </Container>
}