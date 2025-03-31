interface ListItemProps {
  item: Task;
  setCompleted: (id:string ,status:boolean) => void;
  viewableItems: SharedValue<ViewToken[]>;
}