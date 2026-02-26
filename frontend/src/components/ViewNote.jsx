import { useNotesStore } from "../store/useNotesStore";

export default function ViewNote() {
  const { selectedNote, setMode } = useNotesStore();

  const priorityText = (p) => {
    if (p === 2) return "Высокий";
    if (p === 1) return "Средний";
    return "Низкий";
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
      marginBottom: "15px",
      color: "rgb(255, 178, 188)",
    },

    content: {
      fontSize: "16px",
      marginBottom: "15px",
      color: "#333",
    },

    priority: {
      fontWeight: "600",
      marginBottom: "20px",
      color: "rgb(255, 178, 188)",
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
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{selectedNote.title}</h2>
      <p style={styles.content}>{selectedNote.content}</p>
      <p style={styles.priority}>Приоритет: {priorityText(selectedNote.priority)}</p>

      <button style={styles.button} onClick={() => setMode("table")}>
        Назад
      </button>
    </div>
  );
}