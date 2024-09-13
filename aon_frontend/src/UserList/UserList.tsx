import React, { useEffect, useState } from "react";
import "./UserList.scss";
import Header from "../Header/Header";

interface User {
  id: number;
  nome: string;
  email: string;
  idade: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/users/");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  };

  const deleteUser = async (id: number) => {
    const response = await fetch(`http://localhost:8000/users/delete/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return ( <>
    <Header />
    <div className="user-list">
      <h2 className="title">Lista de Usuários - Aon Test</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>{user.nome} </div>
            <div>{user.email}</div>
            <div>{user.idade} anos</div>
            <div className="user-actions">
              <button className="delete" onClick={() => handleDelete(user.id)}>
                Excluir
              </button>
              <button
                onClick={() => (window.location.href = `/update/${user.id}`)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="create-button"
        onClick={() => (window.location.href = `/create`)}
      >
        Criar
      </button>
    </div>
    </>
  );
};

export default UserList;
