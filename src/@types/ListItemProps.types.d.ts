interface ListItemProps {
  item: { id: number; task: string };
  index: number;
  completed: Set<number>;
  setCompleted: (item: { id: number; task: string }) => void;
  viewableItems: SharedValue<ViewToken[]>;
}