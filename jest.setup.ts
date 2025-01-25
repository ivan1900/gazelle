global.console = {
  ...console,
  error: jest.fn(), // Mock console.error
  warn: jest.fn(), // Mock console.warn
};
