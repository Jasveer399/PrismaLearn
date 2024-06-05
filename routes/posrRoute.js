import prisma from "../db/db.congifg.js";
import { Router } from "express";

const router = Router();

router.post("/createpost", async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    if (!title && !content) {
      return res.json({
        status: 400,
        message: "Title and Content is Required",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: Number(user_id),
      },
    });

    return res.status(200).json({
      status: 200,
      message: "New Post Is Createed SuccesFully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

router.get("/getallpost", async (req, res) => {
  try {
    const allPost = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return res.status(200).json({
      status: 200,
      data: allPost,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

export default router;
