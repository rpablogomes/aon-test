import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./UserList/UserList";
import AddOrEditUser from "./AddOrEditUser/AddOrEditUser";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UserList} />
        <Route
          path="/create/"
          Component={() => <AddOrEditUser isEditing={false} />}
        />
        <Route
          path="/update/:id/"
          Component={() => <AddOrEditUser isEditing={true} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
