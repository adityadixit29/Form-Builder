import React from "react";
import Form from "./components/Form";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer correctly

function App() {
  return (
    <div>
      <Form />
      <ToastContainer /> {/* Make sure this is placed here */}
    </div>
  );
}

export default App;