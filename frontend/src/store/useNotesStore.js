import { create } from "zustand";

const API = process.env.REACT_APP_BACKEND;
export const useNotesStore = create((set, get) => ({

notes: [],
highNotes: [],
selectedNote: null,
mode: "table",

loadNotes: async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/notes`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });

  const data = await res.json();

  set({
    notes: Array.isArray(data) ? data : data.notes || []
  });
},
loadHighNotes: async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/notes/high`, {
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  const data = await res.json();
  set({
    highNotes: Array.isArray(data) ? data : data.notes || []
  });
},

createNote: async (note) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Ошибка при создании заметки" };
    }
    await get().loadNotes();
    await get().loadHighNotes();
    set({ mode: "table" });
    return { success: true };
  } catch (err) {
    return { error: "Сервер недоступен" };
  }
},
updateNote: async (id,note)=>{
  const token = localStorage.getItem("token");
  await fetch(`${API}/notes/${id}`,{
  method:"PUT",
  headers:{
  "Content-Type":"application/json",
  Authorization:`Bearer ${token}`
  },
  body:JSON.stringify(note)
  });
  get().loadNotes();
  get().loadHighNotes();
  set({mode:"table"});
},
deleteNote: async (id)=>{
  const token = localStorage.getItem("token");
  await fetch(`${API}/notes/${id}`,{
    method:"DELETE",
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  get().loadNotes();
  get().loadHighNotes();
},
setMode:(mode)=>set({mode}),
setSelected:(note)=>set({selectedNote:note})
}));