import YAML from "yaml";

export default (filepath, ext) => {
  switch (ext) {
    case "json":
      return JSON.parse(filepath);
    case "yaml":
      return YAML.parse(filepath);
    case "yml":
      return YAML.parse(filepath);
    default:
      throw new Error(`Unknown format ${ext}!`);
  }
};
