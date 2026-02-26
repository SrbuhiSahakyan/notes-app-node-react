import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import NotesTable from "./NotesTable";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import ViewNote from "./ViewNote";

export default function Dashboard({ logout }) {
  const { highNotes, loadHighNotes, mode, setMode } = useNotesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      await loadHighNotes();
      setLoading(false);
    };
    fetchNotes();
  }, [loadHighNotes]);

  const styles = {
    container: {
      width: "100%",
      minHeight: "100vh",
      boxSizing: "border-box",
      padding: "80px 30px 30px 30px",
      backgroundColor: "#fbebec",
      color: "white",
      fontFamily: "Arial",
    },

    navbarStyle: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "99%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "10px",
      padding: "10px 10px",
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
      zIndex: 1000,
    },

    title: {
      marginTop: "10px",
      marginBottom: "20px",
      fontSize: "24px",
      color: "rgb(255, 178, 188)",
    },


    text: {
      color: "rgb(255, 178, 188)",
    },

    noteCard: {
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "10px",
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
      color: "rgb(255, 178, 188)",
    },

    button: {
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
      color: "rgb(255, 178, 188)",
      fontWeight: "600"
    },
  };
  const showHighPriority = () => setMode(null);

  return (
    <div style={styles.container}>
      <div style={styles.navbarStyle}>
        <button style={styles.button} onClick={logout}>
          Выйти
        </button>

        {mode && (
          <button style={styles.button} onClick={showHighPriority}>
            Назад
          </button>
        )}

        <button style={styles.button} onClick={() => setMode("table")}>
          Мои заметки
        </button>
      </div>
      {!mode && (
        <>
          <h2 style={styles.title}>Важные заметки</h2>

          {!loading && highNotes.length === 0 && <p style={styles.text}>Пока ничего нет</p>}

          {!loading &&
            highNotes.map((note) => (
              <div key={note.id} style={styles.noteCard}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))}
        </>
      )}

      {mode === "table" && <NotesTable />}
      {mode === "create" && <CreateNote />}
      {mode === "edit" && <EditNote />}
      {mode === "view" && <ViewNote />}
    </div>
  );
}