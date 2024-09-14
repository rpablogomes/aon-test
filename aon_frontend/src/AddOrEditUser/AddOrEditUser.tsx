import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddOrEditUser.scss";
import Header from "../Header/Header";

interface AddOrEditUserProps {
  isEditing?: boolean;
}

interface User {
  nome: string;
  email: string;
  idade: number;
}

const AddOrEditUser: React.FC<AddOrEditUserProps> = ({ isEditing }) => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState<number | undefined>(0);
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);

  const createUser = async (user: User) => {
    try {
      await fetch("http://localhost:8000/users/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return navigate("/");
    } catch {
      alert("Failed to create user");
      throw new Error("Failed to create user");
    }
  };

  const updateUser = async (
    id: number,
    user: { nome: string; email: string; idade: number }
  ) => {
    try {
      await fetch(`http://localhost:8000/users/update/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return navigate("/");
    } catch (error) {
      alert("Failed to update user");
      throw new Error("Failed to update user");
    }
  };

  useEffect(() => {
    if (isEditing && id) {
      const fetchUser = async () => {
        const user = await fetch(
          `http://localhost:8000/users/find/${id}/`
        ).then((e) => e.json());

        if (user) {
          setNome(user.nome);
          setEmail(user.email);
          setIdade(user.idade);
        }
      };
      fetchUser();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && id) {
      await updateUser(parseInt(id), { nome, email, idade: idade! });
    } else {
      await createUser({ nome, email, idade: idade! });
    }
    return navigate("/");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/users/batch/", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        alert("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      alert("Data saved successfully");
      return navigate("/");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <>
      <Header />
      <div className="create-and-add-list">
        {isEditing ? (
          <h2>Atualizar Usuários </h2>
        ) : (
          <h2>Criar Usuário - Aon - Test</h2>
        )}
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              className="form-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Idade</label>
            <input
              className="form-input"
              type="number"
              value={idade || ""}
              onChange={(e) => setIdade(Number(e.target.value))}
            />
          </div>
          <button
            className="submit-button"
            type="submit"
            disabled={!nome || !email || !idade ? true : false}
          >
            {isEditing ? "Atualizar" : "Adicionar"}
          </button>
        </form>
        {!isEditing && (
          <div className="input">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload CSV</button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddOrEditUser;
