export interface OptionsInterface {
  label: string;
  value: string;
  children?: OptionsInterface[];
}

export interface createProjectInterface {
  projectType: string;
  projectName: string;
  templateName: string;
  path: string;
}
