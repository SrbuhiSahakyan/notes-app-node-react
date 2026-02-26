import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createNote = async (req, res) => {
  const { title, content, priority } = req.body;
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        priority: Number(priority),
        userId: req.userId,
      },
    });

    res.json(note);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Create note error" });
  }
};
export const getNotes = async (req,res)=>{
    try{
    const notes = await prisma.note.findMany({
        where:{
            userId:req.userId
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    res.json(notes);
    }catch(err){
        res.status(500).json({error:"Server error"});
    }

};
export const getHighNotes = async (req,res)=>{
    try {
        const notes = await prisma.note.findMany({
            where:{
                userId:req.userId,
                priority: 2
            },
            orderBy:{
                createdAt:"desc"
            }
        });
        res.json(notes);
    }catch(err){
        res.status(500).json({error:"Server error"});
    }
};
export const updateNote = async (req,res)=>{
    try {
        const id = Number(req.params.id);
        const note = await prisma.note.update({
            where:{
                id
            },
            data:req.body
        });
        res.json(note);
    }catch(err){
        res.status(500).json({error:"Server error"});
    }
};
export const deleteNote = async (req,res)=>{
    try{
        const id = Number(req.params.id);
        await prisma.note.delete({
            where:{
                id
            }
        });
        res.json({message:"Deleted"});
    }catch(err){
        res.status(500).json({error:"Server error"});
    }
};