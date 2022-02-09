import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import UseLocalStorage from "../hooks/UseLocalStorage";

import { ContactsProvider } from "../context/contactsPorvider";
import { ConversationsProvider } from "../context/conversationProvider";
import { SocketProvider } from "../context/socketProvider";

function App() {
  const [id, setId] = UseLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
