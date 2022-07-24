export default interface IRepoOrgDropdownProps {
  setShowDropdown: (flag: boolean) => void;
  repoOwner: any[];
  selectedRepoOwner: any;
  setSelectedRepoOwner: (repoOwner: any) => void;
}
