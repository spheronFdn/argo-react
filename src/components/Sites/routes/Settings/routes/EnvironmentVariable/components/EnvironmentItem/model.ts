export default interface IEnvironmentItemProps {
  index: number;
  envKey: string;
  envValue: string;
  type: string;
  updateEnvs: (
    index: number,
    key: string,
    value: string,
    setEditMode: (flag: boolean) => void,
  ) => void;
  removeEnvs: (index: number, setEditMode: (flag: boolean) => void) => void;
  updateEnvLoading: boolean;
  removeEnvLoading: boolean;
}
