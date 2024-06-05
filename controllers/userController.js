import { sendEmail } from "../config/mailer.js";
import prisma from "../db/db.congifg.js";

export const createnewUser = async (req, res) => {
  const { name, email, password } = req.body;

  const finduserwithEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (finduserwithEmail) {
    return res.json({
      status: 400,
      message: "User is Alrady exist With this Email",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  let emailSendStatus = false;
  try {
    await sendEmail(email, "Hi, I'm just testing email");
    emailSendStatus = true;
  } catch (error) {
    console.error("Failed to send email:", error);
  }

  return res.status(200).json({
    data: newUser,
    message: "User created successfully",
    emailSendStatus,
  });
};

export const getalluser = async (req, res) => {
  const alluser = await prisma.user.findMany();
  return res.json({
    status: 200,
    data: alluser,
    message: "All User List",
  });
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json({
      status: 200,
      data: deleteUser,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.json({
      status: 400,
      error: error.meta.cause,
      message: "User ID not Present",
    });
  }
};
