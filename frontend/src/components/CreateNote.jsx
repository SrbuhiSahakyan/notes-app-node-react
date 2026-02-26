import { useState } from "react";
import { useNotesStore } from "../store/useNotesStore";

export default function CreateNote() {
  const { createNote, setMode } = useNotesStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); 
  const submit = async () => {
    if (!title.trim() || !content.trim()) return;

    const result = await createNote({
      title,
      content,
      priority: Number(priority),
    });

    if (result.error) {
      setErrorMessage(result.error);
      return;
    }

    setTitle("");
    setContent("");
    setPriority(0);
    setMode("table");
  };
  const styles = {
    container: {
      backgroundColor: "#fbebec",
      color: "rgb(255, 178, 188)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
      fontFamily: "Arial",
      maxWidth: "600px",
      margin: "20px auto",
    },

    title: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "rgb(255, 178, 188)",
    },

    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid rgb(255, 178, 188)",
      fontSize: "16px",
      color: "rgb(33, 33, 33)",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid rgb(255, 178, 188)",
      fontSize: "16px",
      minHeight: "120px",
      resize: "vertical",
      color: "rgb(33, 33, 33)",
      boxSizing: "border-box",
    },

    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "8px",
      border: "1px solid rgb(255, 178, 188)",
      fontSize: "16px",
      color: "rgb(33, 33, 33)",
      boxSizing: "border-box",
      backgroundColor: "#fff",
    },

    button: {
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
      color: "rgb(255, 178, 188)",
      backgroundColor: "#fff",
      marginRight: "10px",
    },

    disabledButton: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };

  const isValid = title.trim() && content.trim();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Создать заметку</h2>

      <input
        style={styles.input}
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={styles.textarea}
        placeholder="Содержание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        style={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value={0}>Низкий</option>
        <option value={1}>Средний</option>
        <option value={2}>Высокий</option>
      </select>

      <button
        style={{
          ...styles.button,
          ...(isValid ? {} : styles.disabledButton),
        }}
        onClick={submit}
        disabled={!isValid}
      >
        Сохранить
      </button>

      <button style={styles.button} onClick={() => setMode("table")}>
        Назад
      </button>
    </div>
  );
}