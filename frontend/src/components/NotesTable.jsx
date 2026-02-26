import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";

export default function NotesTable() {
  const { notes, loadNotes, deleteNote, setMode, setSelected } = useNotesStore();
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const priorityText = (p) => {
    if (p === 2) return "Высокий";
    if (p === 1) return "Средний";
    return "Низкий";
  };

  const confirmDelete = (note) => {
    setNoteToDelete(note);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (noteToDelete) {
      await deleteNote(noteToDelete.id);
      setShowModal(false);
      setNoteToDelete(null);
    }
  };

  const styles = {
    container: { marginTop: "20px", overflowX: "auto" },
    addButton: {
      padding: "6px 12px",
      marginBottom: "10px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "rgb(255, 178, 188)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fbebec",
      color: "rgb(255, 178, 188)",
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
    },
    th: { borderBottom: "2px solid rgb(255, 178, 188)", textAlign: "left", padding: "10px" },
    td: { padding: "10px", borderBottom: "1px solid rgb(255, 178, 188)" },
    tdButtons: { padding: "10px", display: "flex", justifyContent: "end", borderBottom: "1px solid rgb(255, 178, 188)"  },
    actionButton: {
      padding: "10px 10px",
      marginRight: "6px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
    },
    viewBtn: { backgroundColor: "rgb(255, 178, 188)", color: "#fff" },
    editBtn: { backgroundColor: "rgb(255, 140, 160)", color: "#fff" },
    deleteBtn: { backgroundColor: "rgb(255, 100, 120)", color: "#fff" },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "300px",
      textAlign: "center",
      color: "#333",
    },
    modalButton: {
      padding: "8px 16px",
      margin: "10px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 3px 12px rgba(47, 43, 61, 0.14)",
    },
    confirmBtn: { backgroundColor: "rgb(255, 100, 120)", color: "#fff" },
    cancelBtn: { backgroundColor: "rgb(200, 200, 200)", color: "#333" },
  };

  return (
    <div style={styles.container}>
      <button style={styles.addButton} onClick={() => setMode("create")} title="Добавить заметку">
        +
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Название</th>
            <th style={styles.th}>Приоритет</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td style={styles.td}>{note.title}</td>
              <td style={styles.td}>{priorityText(note.priority)}</td>
              <td style={styles.tdButtons}>
                <button
                  style={{ ...styles.actionButton, ...styles.viewBtn }}
                  onClick={() => {
                    setSelected(note);
                    setMode("view");
                  }}
                >
                  Просмотр
                </button>

                <button
                  style={{ ...styles.actionButton, ...styles.editBtn }}
                  onClick={() => {
                    setSelected(note);
                    setMode("edit");
                  }}
                >
                  Редактировать
                </button>

                <button
                  style={{ ...styles.actionButton, ...styles.deleteBtn }}
                  onClick={() => confirmDelete(note)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>Вы уверены, что хотите удалить заметку "{noteToDelete.title}"?</p>
            <button style={{ ...styles.modalButton, ...styles.confirmBtn }} onClick={handleDelete}>
              Удалить
            </button>
            <button
              style={{ ...styles.modalButton, ...styles.cancelBtn }}
              onClick={() => setShowModal(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}