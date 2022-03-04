import { prisma } from "../helpers/utils.js";

export const index = async (req, reply) => {
  const { user_id } = req.query;
  const { page, page_size } = req.pagination;

  const where = !!user_id
    ? {
        user: {
          id: {
            equals: parseInt(user_id),
          },
        },
      }
    : {};

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        text: true,
        createAt: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      ...{ where },
      skip: (page - 1) * page_size,
      take: page_size,
      orderBy: {
        createAt: "desc",
      },
    });

    const total = await prisma.post.count({
      where,
    });

    const totalPages = Math.ceil(total / page_size);

    reply.status(200).send({ posts, totalPages });
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

export const create = async (req, reply) => {
  const {
    user: { id: user_id },
  } = req;

  const { text } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        text,
        user: {
          connect: {
            id: parseInt(user_id),
          },
        },
      },
    });

    reply.status(201).send(post);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

export const remove = async (req, reply) => {
  const { id: post_id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: { id: parseInt(post_id) },
    });
    reply.status(200).send(post);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};
