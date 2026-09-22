/**
 * Wraps a Zod schema (validating { body, query, params }) as Express middleware.
 * On success, replaces req.body/query/params with the parsed & coerced data.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }

    if (result.data.body) req.body = result.data.body;
    if (result.data.query) req.validatedQuery = result.data.query;
    if (result.data.params) req.params = result.data.params;

    next();
  };
}

module.exports = validate;
