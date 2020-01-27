import bus from './bus';

/**
 * Bake
 */
function bake(config) {
  // Handling config as string
  if (typeof config === 'string') {
    config = {
      message: config
    };
  }

  // Calculate duration
  if (config.duration == null) {
    config.duration = Math.max(
      2000,
      (1000 * config.message.length) / 12.84 + 400
    );
  }

  // Type
  if (config.type == null) {
    config.type = 'default';
  }

  // HTML support?
  config.html = !!config.html;

  // Emit
  bus.$emit('tostini-bake', config);
}

export default bake;
