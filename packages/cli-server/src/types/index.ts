export interface optionsInterface {
  label: string;
  value: string;
  children?: optionsInterface[];
}

export interface createProjectInterface {
  projectType: string;
  projectName: string;
  templateName: string;
  path: string;
}
