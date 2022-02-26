export const pagination = (inital_page = 1, default_page_size = 10) => {
  return async (req, reply) => {
    const { page, page_size } = req.query;

    req.pagination = {
      page: page ? parseInt(page) : inital_page,
      page_size: page_size ? parseInt(page_size) : default_page_size,
    };
  };
};
